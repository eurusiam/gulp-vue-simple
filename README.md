# gulp-vue-simple
# 專案說明
## 目錄結構
現有專案目錄結構表列如下：
```
dev
    style
    image
    view
    script
design
    ....
dist
    css
    img
    js
    font
gulp
    gulpfile.dev.js
    gulpfile.desgin.js
bower.json
package.json
README.md
.gitignore
.bowerrc
```
## 結構說明

- dev 前端團隊開發主目錄 
    - style 樣式表目錄，亦為團隊產出的css樣式表
    - view 頁面目錄，亦為團隊產出的html頁面
    - script javascript目錄，為前端團隊開發核心目錄
- design UI設計團隊主目錄
    - (需design團隊協助補述)
    - ...族繁不及備載...
- dist 前端團隊產出目錄，亦為最後部署產品的內容物
    - css css檔放置處
    - img 圖片檔放置處
    - js javascript檔放置處
    - font 文字檔放置處(if necessary)
- gulp gulp目錄檔
    - gulpfile.js 為前端團隊主要gulpfile(或備份)檔
    - ...族繁不及備載...
- bower.json npm系統用於作套件依賴管理的json檔
- package.json npm系統用於作套件依賴管理的json檔
- .gitignore git-commit至local repository所用之忽略清單
- .bowerrc bower套件下載的定義檔
- README.md 

## Gulp執行說明

開啟瀏覽器
```
    gulp start
```

以開發者模式開啟瀏覽器
```
    gulp start:dev
```

啟用程式碼監看模式
```
    gulp watch
```

建置dev目錄所有程式碼並部署至對應目錄中
```
    gulp build
```

清除dist目錄下所有目錄及檔案
```
    gulp clean
```





