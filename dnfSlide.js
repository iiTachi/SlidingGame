window.onload = function() {
    create_pic();
    document.getElementById("restart").addEventListener("click", random_pos);
    document.getElementById("change_image").addEventListener("click", change_img);
};

/* 产生拼图 */
function create_pic() {
    var picture = document.getElementById("picture");
    var whole = document.getElementById("whole_picture");
    for (var i = 1; i <= 9; i++) {
        var part = document.createElement("div");
        // 为拼图添加监听事件：点击移动“pic_move”
        part.addEventListener("click", pic_move);
        // 为每张图片的每一个位置添加类名：如第一张图的第四块：“part0 position_4”
        part.className = "part" + pic_num + " position_"+i;
        picture.appendChild(part);
        part.id = "_position_"+i;
    }
}

/* 检查产生的随机数列是否是合理的：随机数列的逆序数若为奇数，则不能还原；若为偶数则可以还原 */
function check_random_isValid() {
    var count = 0;
    for (var i = 0; i < 9; i++) {
        for (var j = i+1; j < 9; j++) {
            if (random_arr[j] < random_arr[i]) {
                count++;
            }
        }
    }
    return count%2===0;
}

/* 改变图片 */
var pic_num = 0; 
function change_img(event) {
    var divID = document.getElementById("win");
    divID.style.display='none';
    if (pic_num < 100) {
        pic_num++;
        pic_num %= 4;
        var whole_pic = document.getElementById("wp");
        whole_pic.src = "swordman" + pic_num + ".png";
    }
    else return;
    for (var i = 0; i < 9; i++) {
        picture.childNodes[i].className = "part" + pic_num + " position_"+(i+1);
    }
    
}

/* 点击图片触发的事件处理器 */
function pic_move(event) {
    var blank_pic_offset = document.getElementById("_position_9");
    var blank_pic_offset_top = blank_pic_offset.offsetTop;
    var blank_pic_offset_left = blank_pic_offset.offsetLeft;
    var _offset_top = this.offsetTop;
    var _offset_left = this.offsetLeft;
    /* 判断点击的图片块是否与空格块相邻 */
    if ((Math.abs(blank_pic_offset_top - _offset_top) == 158 && blank_pic_offset_left == _offset_left) ||
        (Math.abs(blank_pic_offset_left - _offset_left) == 167 && blank_pic_offset_top == _offset_top)) {
        var str = blank_pic_offset.className;
        blank_pic_offset.className = this.className;
        this.className = str;
        if (check()){
            win();
        }; // 检查是否还原原图
    }
}

/* 产生随机数列定义位置 */
function random_pos(event) {
    var divID = document.getElementById("win");
    divID.style.display='none';
    /* 产生随机数列前先将拼图块对应的位置复位 */
    for (var k = 1; k <= 9; k++) {
        document.getElementById("_position_"+k).className="part"+pic_num+" position_"+k;
    }
    var part = document.getElementById("picture").childNodes;
    random_arr = [];
    for (var j = 0; j < 8; j++) {
        random_arr[j] = j+1;
    }
    /* 利用sort和cmp进行随机打散 */
    function cmp() { return 0.5-Math.random(); }
    while(1) {
        random_arr.sort(cmp);
        if (check_random_isValid()) {
            break;
        }
    }
    /* 通过更改类名来改变位置 */
    for (var i = 0; i < 8; i++) {
        part[i].className = "part" + pic_num + " position_" + random_arr[i];
    }
}

/* 检查是否还原原图 */
function check() {
    for (var i = 1; i <= 9; i++) {
        var item = document.getElementById("_position_"+i);
        if (item.className != "part" + pic_num +" position_"+i &&
            item.className != "part0" + " position_" + i + " part1") {
            return;
        }
    }
    return true;

}

/* 获胜窗口弹出*/
function win(){
    divID = document.getElementById("win");
    divID.style.display='block';
}
