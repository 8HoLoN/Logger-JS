/*!* @preserve
 *
 * https://github.com/8HoLoN/DataStorage
 * @version: 0.2.00 ( June 2015 )
 * @author 8HoLoN / https://github.com/8HoLoN/
 * < 8holon [at] gmail.com >
 * Copyright (c) 2011-2015 Alexandre REMY
 */
;(function(_g){
  'use strict';
  function Logger(_args){
    _args = _args || {};
    this.silentMode = typeof _args.silentMode === 'boolean'? _args.silentMode : true;
    this.logs = [];
    this.lineBreaker = '\r\n';
    this.levels = ['error','warning','notice'];
    this.level = typeof _args.level === 'string'? this.levels.indexOf(_args.level) : 0;
  }

  Logger.prototype.log = function(_msg,_level) {

    var _date = new Date().toJSON();
    var _log = _date + ' - ' + _msg;
    var _level = _level || this.level;
    if(!this.silentMode){
      if( typeof console === 'object' && typeof console.log === 'function' ){
        console.log(_log);
      }
    }else{// file ou txt
      this.logs.push({date:_date,log:_log,level:this.levels.indexOf(_level)});
    }

  };

  Logger.prototype.save = function(_args) {
    _args = _args || {};
    var _logs = '';
    for(var i=0;i<this.logs.length;i++){
      if( (!_args.after || this.logs[i].date >= _args.after) &&
          (!_args.before || this.logs[i].date <= _args.before) &&
          (!_args.lowestLevel || this.logs[i].level <= this.levels.indexOf(_args.lowestLevel)) &&
          (!_args.highestLevel || this.logs[i].level >= this.levels.indexOf(_args.highestLevel)) ){
        _logs += (_logs===''?'':this.lineBreaker) + this.logs[i].log;
      }
    }
    _saveFile(_logs,'logs');

  };

  function _saveFile(l_outputFile,l_outputFilename){
    //*
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(l_outputFile));
    //console.log(l_file.name.replace(/vtt$/g,"srt"));
    downloadLink.setAttribute('download', l_outputFilename);
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.onclick = function(l_e){document.body.removeChild(l_e.target);};
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();

    //*/
  }

  _g.Logger = Logger;

})(window);
