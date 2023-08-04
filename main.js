const neko_box = document.getElementById('neko_box');
const select_neko = document.getElementById('select_neko');
const range_boxs = document.getElementsByClassName('range_box');

let neko_count = 0;
let neko_sel = 1;

let bg_cols = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [255, 255, 0],
  [255, 0, 255],
  [0, 255, 255]
];

let fg_cols = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

for(let i = 0; i < 3; i++){
  NekoSummon(2);
}

for(let i = 0; i < 3; i++){
  for(let i2 = 0; i2 < 2; i2++){
    const range_html = 
        '<div class="ranges">'
        + '<span>' + ['R', 'G', 'B'][i] + ':</span>'
        + '<input class="inp_range' + i2 + '" type="range" min="0" max="255" value="' + (!i2 ? bg_cols[0][i] : fg_cols[0][i]) + '" onchange="ColorChange(value,' + i2 + ',' + i + ', 0)">'
        + '<input class="inp_number' + i2 + '"  type="number" min="0" max="255" value="' + (!i2 ? bg_cols[0][i] : fg_cols[0][i]) + '" onchange="ColorChange(value,' + i2 + ',' + i + ', 1)">'
      + '</div>';


    range_boxs[i2].innerHTML += range_html;
  }
}


function NekoSummon(mode){
  if(neko_count == 1 + (mode * 5) && mode != 2){
    alert("ﾈｺﾁｬﾝの数は1〜6匹です")
  }

  else if(mode){
    const neko_html =
      '<div class="neko_chan" style="--bgcol: rgb(' + bg_cols[neko_count].toString() + '); --fgcol: rgb(' + fg_cols[neko_count].toString() + ');">'
      + '<div class="chara">'
        + '<div class="head_out">'
          + '<div class="ear ear1"></div>'
          + '<div class="ear ear2"></div>'
          + '<div class="head_in">'
            + '<div class="face">'
              + '<div class="eye eye1"></div>'
              + '<div class="mouse"></div>'
              + '<div class="eye eye2"></div>'
            + '</div>'
          + '</div>'
        + '</div>'
        + '<div class="body_out">'
          + '<div class="body_in">'
            + '<div id="neko_num' + (neko_count + 1) + '" class="neko_num"></div>'
          + '</div>'
          + '<div class="arm arm1"></div>'
          + '<div class="arm arm2"></div>'
          + '<div class="leg leg1"></div>'
          + '<div class="leg leg2"></div>'
        + '</div>'
      + '</div>'
    + '</div>';

    neko_box.innerHTML += neko_html;
    neko_count++;
    select_neko.innerHTML += '<option value="' + neko_count + '">ﾈｺﾁｬﾝ' + neko_count + '号</option>';
  }

  else{
    neko_box.innerHTML = neko_box.innerHTML.substr(0, neko_box.innerHTML.lastIndexOf('<div class="neko_chan"'));
    select_neko.innerHTML = select_neko.innerHTML.substr(0, select_neko.innerHTML.lastIndexOf('<option'));
    neko_count--;

    if(neko_sel > neko_count){
      neko_sel = 1;
      select_neko.options[0].selected = true;
      NekoSelect();

      return;
    }
  }

  if(mode < 2){
    select_neko.options[neko_sel - 1].selected = true;
  }
}


function NekoSelect(){
  neko_sel = select_neko.value;

  for(let i = 0; i < 3; i++){
    for(let i2 = 0; i2 < 2; i2++){
      document.getElementsByClassName('inp_range' + i2)[i].value = (!i2 ? bg_cols[neko_sel - 1][i] : fg_cols[neko_sel - 1][i]);
      document.getElementsByClassName('inp_number' + i2)[i].value = (!i2 ? bg_cols[neko_sel - 1][i] : fg_cols[neko_sel - 1][i]);
    }
  }
}


function ColorChange(value, mode, col_num, type){
  if(!mode){
    bg_cols[neko_sel - 1][col_num] = value;
    document.getElementsByClassName('neko_chan')[neko_sel - 1].style.setProperty('--bgcol', 'rgb(' + bg_cols[neko_sel - 1].toString() + ')');
  }

  else{
    fg_cols[neko_sel - 1][col_num] = value;
    document.getElementsByClassName('neko_chan')[neko_sel - 1].style.setProperty('--fgcol', 'rgb(' + fg_cols[neko_sel - 1].toString() + ')');
  }

  if(!type){
    document.getElementsByClassName('inp_number' + mode)[col_num].value = value;
  }

  else{
    document.getElementsByClassName('inp_range' + mode)[col_num].value = value;
  }
}
