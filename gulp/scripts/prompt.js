var gulp = require('gulp');
var prompt = require("gulp-prompt");


gulp.task('selecttask', function () {
    
    //三種模式用變數帶出來    
    var  task_mission = ['all' , 'dev' , 'clear']

    return gulp.src('./gulpfile.js')
        .pipe(prompt.prompt({
            type: 'checkbox',
            name: 'task',
            message: '你想執行那個任務？（ 請按空白鍵選擇 ）',
            choices: task_mission
        }, function (res) {
            var selectedTask = res.task;
            gulp.start(selectedTask);
            // console.log('選中:', res);
        }));
});

// 執行模式  會相對應上方的task_mission 變數
gulp.task('all', ['styles', 'static', 'libs']);
gulp.task('dev', ['styles', 'static']);
gulp.task('clear', ['clean']);




//執行
gulp.task('default', ['selecttask']);
