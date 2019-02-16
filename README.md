# Clappr Source Selection Plugin
A [Clappr](https://github.com/clappr/clappr) UI plugin to select sources.

<p align="center">
  <img src="https://raw.githubusercontent.com/spreadspace/clappr-source-selector-plugin/master/example.png" alt="Clappr Source Selector"/>
</p>

This is loosly based on the level-selector plugin and was quickly hacked together for a project of mine. Chances are that there are better ways to do what i do here. Also i'm by no means a frontend developer. Therefore my knowledge of npm, webpack and all the other stuff, that seems to be all the rage these days, is very limited. Feel free to send pull requests or open issues but it might take me a while to respond...

## Usage

```html
<head>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr/dist/clappr.min.js"></script>
  <script type="text/javascript" src="/dist/source-selector.js"></script>
</head>

<body>
  <div id="player"></div>
  <script>
    window.player = new Clappr.Player({
      parentId: '#player',
      source: 'http://www.example.com/hls/orig.m3u8',

      plugins: [SourceSelector],
      sourceSelectorConfig: { sources: [
        { label: 'Original', source: 'http://streaming.example.com/hls/orig.m3u8' },
        { label: 'English', source: 'http://streaming.example.com/hls/en.m3u8' },
        { label: 'Deutsch', source: 'http://streaming.example.com/hls/dt.m3u8' }
      ]}
    })
  </script>
</body>
```
