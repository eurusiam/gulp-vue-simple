# gulp-vue-simple
# 專案說明
## 目錄結構
現有專案目錄結構表列如下：
```
dev
  |__fonts
  |__images
  |__style
  |__script
  |__view

design
    ....

dist
  |__css
  |   |__assets
  |   |__fonts
  |   |__images
  |
  |__js
      |__assets

gulp
  |__scripts

bower.json
package.json
README.md
.gitignore
.bowerrc
```
## 結構說明

- dev...............前端團隊開發主目錄 
    - fonts.........ttf  <ui>
    - images........imgs <ui>
    - style ........css  <fe>
    -   |__design...css  <ui>
    - script........js   <fe>
    -   |__design...js   <ui>
    - view .........html <fe>
    -   |__modules..html <fe>

- design ...........UI設計團隊主目錄
    - ..............(需design團隊協助補述)
    - ...............族繁不及備載...

- dist .............html <整體前端總產出目錄，亦為最後部署產品的內容物>
    - css ..........css <ui & fe>
    -   |__assets...css <ui>
    -   |__fonts....ttf <ui>
    -   |__images...imgs<ui>
    - js............js  <fe>
    -   |__assets...js  <ui>

- gulp .............gulp目錄
    |__scripts......js <gulp tasks>

- gulpfile.js.......gulp動作控制設定
- bower.json........npm系統用於作套件依賴管理的json檔
- package.json......npm系統用於作套件依賴管理的json檔
- .gitignore........git-commit至local repository所用之忽略清單
- .bowerrc..........bower套件下載的定義檔
- README.md 

## Gulp執行說明

**第一次運行，應先執行  ``gulp start:all``
**第二次運行以後，可執行  ``gulp / gulp start:fe``

以前端開發模式開啟瀏覽器<只有FE更動更新>
```
    gulp / gulp start:fe
```

以開發模式開啟瀏覽器<包含UI&FE更動>
```
    gulp start:all
```

建置dev目錄所有程式碼並部署至對應目錄中 / FE對應目錄 / UI對應目錄
```
    gulp build / gulp build-fe / gulp build-ui
```

清除dist目錄下所有目錄及檔案 / FE檔案相關 / UI相關檔案
```
    gulp clean / gulp clean-fe / gulp clean-ui
```








