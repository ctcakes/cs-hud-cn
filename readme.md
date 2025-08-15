# cs-hud
### 此项目fork自 [cs-hud](https://github.com/drweissbrot/cs-hud)
### this project is a fork of [cs-hud](https://github.com/drweissbrot/cs-hud)

一个免费且可自定义的观战 HUD，用于你的 **Counter-Strike 2（以及 CS:GO）** 直播。

![](assets/cs2-hud-screenshot-1080.png)

## 快速开始
最简单的方式是使用预打包的可执行文件，未来也会提供其他运行方式。  
<!-- TODO write, then link to more in-depth guides for running via yarn, docker -->

1. 如果你是 Windows 用户，下载 [`cs-hud-server-win.exe`](https://github.com/drweissbrot/cs-hud/releases/latest/download/cs-hud-server-win.exe)；如果是 Linux 用户，下载 [`cs-hud-server-linux`](https://github.com/drweissbrot/cs-hud/releases/latest/download/cs-hud-server-linux)。更多信息可在 [Releases 标签页](https://github.com/drweissbrot/cs-hud/releases/latest) 查看。
2. 同时下载 [`gamestate_integration_drweissbrot_hud.cfg`](https://github.com/drweissbrot/cs-hud/releases/latest/download/gamestate_integration_drweissbrot_hud.cfg)。
3. 打开你的 CS2 文件夹，进入 `game/csgo/cfg` 子目录。在 Windows 默认路径是：
```C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg```
你也可以通过 Steam 库，右键 CS2 → `属性...` → `已安装文件` → `浏览...`，然后依次进入 `game/csgo/cfg`。
4. 将 `gamestate_integration_drweissbrot_hud.cfg` 保存到此目录。
5. 启动 CS2（如果已经打开，需要重启），找到一场可观战的比赛。你可以播放 demo，也可以通过 CSTV 观战朋友。
6. 运行 `cs-hud-server-win.exe` 或 `cs-hud-server-linux`。
7. 在你喜欢的浏览器中打开 http://localhost:31982/hud，你应该能看到 HUD。

此外，还有配置页面：http://localhost:31982/config，以及用于观战的雷达：http://localhost:31982/radar。  
还有一些你可能想用的 [控制台命令](docs/cvars.md)。

根据你的使用方式，你现在有两种选择：

### OBS 浏览器来源
如果你不介意自己在游戏中看不到 HUD，或者不能/不想用全屏窗口模式运行游戏，这是一个不错的选择。  
在其他直播软件中也可能以类似方式工作。

1. 确保你已经完成了上面的步骤，你应该能看到控制台显示 `cs-hud is active`。
2. 在 OBS 中，添加游戏捕获或窗口捕获，选择 Counter-Strike。
3. 添加浏览器来源。将 `URL` 设置为 `http://localhost:31982/hud?transparent`，设置你想要的 `宽度`、`高度` 和 `FPS`，并确保 `自定义 CSS` 为空。
4. 找到一场可观战的比赛，浏览器来源就会显示 HUD。（如果你不在观战状态，则不会显示任何内容。）

### 全屏窗口模式
或者，你也可以用单独的可执行文件在 CS 上叠加 HUD。

1. 确保你已经完成了上面的步骤，你应该能看到控制台显示 `cs-hud is active`。
2. 下载 [`cs-hud-overlay-win32-x64.zip`](https://github.com/drweissbrot/cs-hud/releases/latest/download/cs-hud-overlay-win32-x64.zip)（Windows）或 [`cs-hud-overlay-linux-x64.tar.gz`](https://github.com/drweissbrot/cs-hud/releases/latest/download/cs-hud-overlay-linux-x64.tar.gz)（Linux），解压所有文件。
3. 运行 `cs-hud-overlay.exe`（Windows）或 `cs-hud-overlay`（Linux）。
4. 打开 CS，进入 设置 → 视频，将 `显示模式` 设置为 全屏窗口。
5. 找到一场可观战的比赛，HUD 会叠加在屏幕上。
6. 如果 HUD 出现在错误的显示器上，可在任务栏选择窗口，按 `Win + Shift + 方向键` 移动到正确显示器。

## 常见问题

### 支持 CS2 吗？
支持。  
该 HUD 在 CS:GO 和 CS2 中都能正常工作。如果发现异常，请 [提交 issue](https://github.com/drweissbrot/cs-hud/issues)。

### 可以用于我的活动吗？
可以。  
不要求署名，但如果可能，请在某处附上该 GitHub 项目链接。

### 为什么要使用这个 HUD？
CS 游戏内置的观战 HUD 并不是为视频设计的。  
在直播中，你不能简单按 Tab 就知道某人击杀数。  
CS2 早期甚至不显示玩家名字！  
像这个自定义 HUD 专为视频设计：信息完整、在大屏上更清晰、视觉上也更美观。  

为什么选择这个 HUD？它易于使用、易于扩展和定制，而且免费。  
（请注意，这是个人爱好项目，如果你是大型赛事组织者，可能需要有 SLA 的支持，建议另寻其他方案 :D）

### 如何修改颜色/字体/缩放？
简单的视觉修改可通过配置页面 http://localhost:31982/config 的 `样式覆盖` 进行：

- 修改颜色：选择颜色 → 点击保存 → 强制刷新 HUD。大多数元素使用 `css.terrorists-fill-rgb`（及对应 CT 颜色），大多数文字使用 `css.terrorists-text-rgb` 等。注意，颜色修改需要刷新 HUD 才会生效。
- 修改字体：在 `css.primary-font-family` 文本框输入字体名称 → 点击保存 → 强制刷新 HUD。字体需安装在你的电脑上。注意，字体修改也需要刷新 HUD 才生效。
- 修改缩放：在 `css.base-scale-factor` 文本框输入值 → 点击保存 → 强制刷新 HUD。默认约为 `10px`，若想放大两倍输入 `20px`。值过大或过小可能破坏布局，修改也需刷新 HUD 才生效。

如果想修改其他内容，可查看 [主题文档](docs/theming.md)。

### 需要帮助！
请先 [查看 docs 文件夹](https://github.com/drweissbrot/cs-hud/tree/master/docs)。  
如果没解决你的问题，请 [提交 issue](https://github.com/drweissbrot/cs-hud/issues)。  
请不要通过邮件询问帮助（其他内容可通过邮件联系）。

## 致谢
特别感谢 [readtldr.gg](https://readtldr.gg) 提供 [Simple Radar](https://readtldr.gg/simpleradar)，本项目中使用的清晰可读小地图。  
([你也可以在游戏中使用，非常棒！](https://readtldr.gg/simpleradar))

![](assets/simpleradar.webp)

特别感谢 [u/Bkid](https://www.reddit.com/user/bkid) 对 Game State Integration 的详细文档。  
没有那篇帖子，这个项目也不会存在。

