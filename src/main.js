import { Events, Styler, UICorePlugin, template } from 'clappr'
import pluginHtml from './public/source-selector.html'
import pluginStyle from './public/style.scss'

const AUTO = -1

export default class SourceSelector extends UICorePlugin {

  static get version() { return VERSION }

  get name() { return 'source_selector' }
  get template() { return template(pluginHtml) }

  get attributes() {
    return {
      'class': this.name,
      'data-source-selector': ''
    }
  }

  get events() {
    return {
      'click [data-source-selector-select]': 'onSourceSelect',
      'click [data-source-selector-button]': 'onShowSourceSelectMenu'
    }
  }

  bindEvents() {
    this.listenTo(this.core, Events.CORE_ACTIVE_CONTAINER_CHANGED, this.reload)
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.render)
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_HIDE, this.hideSelectSourceMenu)
  }

  unBindEvents() {
    this.stopListening(this.core, Events.CORE_ACTIVE_CONTAINER_CHANGED)
    this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_RENDERED)
    this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_HIDE)
  }

  reload() {
    this.unBindEvents()
    this.bindEvents()
  }

  shouldRender() {
    if (!this.core.activeContainer) return false

    if (this.core.options.sourceSelectorConfig === undefined) return false
    if (this.core.options.sourceSelectorConfig.sources === undefined) return false
    if (this.core.options.sourceSelectorConfig.sources.length < 1) return false

    let currentPlayback = this.core.activePlayback
    if (!currentPlayback) return false

    return true
  }

  render() {
    if (this.shouldRender()) {
      let style = Styler.getStyleFor(pluginStyle, { baseUrl: this.core.options.baseUrl })
      this.sources = this.core.options.sourceSelectorConfig.sources

      this.$el.html(this.template({ 'sources': this.sources }))
      this.$el.append(style)
      this.core.mediaControl.$('.media-control-left-panel').append(this.el)

      for (let i = 0; i < this.sources.length; i++) {
        if (this.currentSource === undefined && this.sources[i].source === this.core.options.source) {
          this.currentSource = i
        }
      }
      this.highlightCurrentSource()
    }
    return this
  }


  onSourceSelect(event) {
    this.currentSource = parseInt(event.target.dataset.sourceSelectorSelect, 10);
    let isPlaying = this.core.getCurrentPlayback().isPlaying()
    this.core.configure({ source: this.sources[this.currentSource].source, autoPlay: isPlaying })
    return false
  }

  onShowSourceSelectMenu() { this.toggleContextMenu() }

  hideSelectSourceMenu() { this.$('.source_selector ul').hide() }

  toggleContextMenu() { this.$('.source_selector ul').toggle() }

  buttonElement () { return this.$('.source_selector button') }

  sourceElement (id) {
    return this.$('.source_selector ul a' + (!isNaN(id) ? '[data-source-selector-select="' + id + '"]' : '')).parent()
  }

  highlightCurrentSource () {
    this.sourceElement().removeClass('current')
    if (this.sources && this.currentSource !== undefined && this.sources[this.currentSource].label) {
      this.sourceElement(this.currentSource).addClass('current')
      this.buttonElement().text(this.sources[this.currentSource].label)
    }
  }
}
