/*根据id来获取元素*/
function $(id)
{
	return document.getElementById(id);
}

/*创建div*/
function creatediv(className)
{
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var clock = null;
var state = 0;
var speed = 5;			//方块下落速度
var flag = false;			//true表示游戏在进行中

/*点击开始按钮，开始游戏*/
function start()
{
	if(!flag)
	{
		init();
	}
	else
	{
		alert('游戏已开始！');
	}
}

/*游戏初始化*/
function init()
{
	flag = true;
	speed = 5;
	for(var i = 0; i < 4; ++i)
	{
		createrow();
	}
	/*onclick事件*/
	$('main').onclick = function(ev)
	{
		ev = ev || event;
		judge(ev);
	}
	/*每30ms调动一次move()*/
	clock = window.setInterval('move()', 30);
}

/*判断游戏是否结束*/
function over()
{
  var rows = con.childNodes;
  if((rows.length === 5) && (rows[rows.length - 1].pass_black !== 1))
  {
    fail();
	}
	for(let i = 0; i < rows.length; ++i)
	{
		if(rows[i].pass_white === 1)
		{
			fail();
		}
	}
}

/*游戏结束*/
function fail()
{
  clearInterval(clock);
  flag = false;
	confirm('最终得分为' + parseInt($('score').innerHTML));
	var con = $('con');
	con.innerHTML = "";
	$('score').innerHTML = 0;
	con.style.top = '-408px';
}

/*判断是否点击到白块、黑块*/
function judge(ev)
{
	if((ev.target.className.indexOf('black') === -1) && (ev.target.className.indexOf('cell') !== -1))
	{
		ev.target.parentNode.pass_white = 1;
	}

	if(ev.target.className.indexOf('black') !== -1)
	{
		ev.target.className = 'cell';
		ev.target.parentNode.pass_black = 1;
		score();
	}
}

/*创建<div class = 'row'>以及四个子节点*/
function createrow()
{
  var con = $('con');
  var row = creatediv('row');		//创建div className = row
  var arr = createcell();			//创建cell节点名称数组

  con.appendChild(row);				//将row添加为con的子节点

	/*添加row的cell子节点*/
  for(var i = 0; i < 4; ++i)
  {
    row.appendChild(creatediv(arr[i]));
  }
  if(con.firstChild === null)
  {
    con.appendChild(row);
  }
  else
  {
    con.insertBefore(row, con.firstChild);
  }
}

/*创建一个数组，存储cell节点的类名*/
function createcell()
{
  var temp = ['cell', 'cell', 'cell', 'cell'];
  var i = Math.floor(Math.random()*4);  //随机产生黑块位置
  temp[i] = 'cell black';
  return temp;
}

/*让黑块移动*/
function move()
{
  var con = $('con');
  var top = parseInt(window.getComputedStyle(con, null)['top']);

  if(speed + top > 0)
  {
    top = 0;
  }
  else
  {
    top += speed;
  }
  con.style.top = top + 'px';
  over();
  if(top === 0)
  {
    createrow();
    con.style.top = '-102px';
    delrow();
  }
}

/*加速函数*/
function speedup()
{
  speed += 1;
  if(speed === 10)
  {
    alert('超神了！');
  }
}

/*删除某一行*/
function delrow()
{
  var con = $('con');
  if(con.childNodes.length === 6)
  {
    con.removeChild(con.lastChild);
  }
}

/*分数记录*/
function score()
{
	var newscore = parseInt($('score').innerHTML) + 1;
	$('score').innerHTML = newscore;
	if(newscore % 15 === 0)
	{
		speedup();
	}
}
