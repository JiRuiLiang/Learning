var gulp = require('gulp')
var sftp = require('gulp-sftp')
gulp.task('default', function () {
  return gulp.src('dist/**/*')
    .pipe(sftp({
      host: '106.14.97.213', // 服务器IP例如 47.245.18.226
      user: 'root', // 服务器用户名
      pass: 'WeInstallment$2019!iKP', // 密码
      remotePath: '/usr/local/nginx/html/huolika' // 打包服务器路径
    }))
})
