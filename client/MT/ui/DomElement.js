MT(
	MT.ui.DomElement = function(type){
		type = type || "div";
		this.el = document.createElement(type);
		this.el.style.position = "absolute";
		this.style = this.el.style;
		this.style.top = 0;
		this.style.right = 0;
		this.style.bottom = 0;
		this.style.left = 0;
		this.el.ctrl = this;
		
		this.index = 0;
		this.isVisible = true;
		this.children = [];
	},
	{
		_parent: null,
		addChild: function(el, index){
			el._parent = this.el;
			el.parent = this;
			
			if(index != void(0)){
				el.index = index;
			
				for(var i=0; i<this.children.length; i++){
					if(this.children[i].index >= index){
						this.children[i].index++;
					}
				}
				
				this.children.push(el);
				
				this.sortChildren();
			}
			else if(index == void(0)){
				el.index = this.children.length;
				this.children.push(el);
			}

			
			if(el.isVisible){
				el.show(el._parent);
			}

			return el;
		},
		
		hasParent: function(parent){
			var p = this.parent;
			while(p){
				if(p == parent){
					return true;
				}
				p = p.parent;
			}
			
		},
		
		clear: function(){
			for(var i=0; i<this.children.length; i++){
				this.children[i].remove();
			}
			this.children.length = 0;
			
		},
		
		remove: function(){
			if(this.el.parentNode){
				this.el.parentNode.removeChild(this.el);
			}
		},
   
		sortChildren: function(){
			var c = null;
			var children = [];
			
			this.children.sort(function(a, b){
				return a.index - b.index;
			});
			
			for(var i=0; i<this.children.length; i++){
				var c = this.children[i];
				children.push(c);
				if(c.el.parentNode){
					c.el.parentNode.removeChild(c.el);
				}
			}
			
			this.children.length = 0;
			
			for(var i=0; i<children.length; i++){
				this.addChild(children[i]);
			}
		},
   
		removeChild: function(child){
			for(var i=0; i<this.children.length; i++){
				if(this.children[i] == child){
					this.children[i] = this.children[this.children.length-1];
					this.children.length = this.children.length - 1;
					this.sortChildren();
					return child;
				}
			}
		},
		show: function(parent){
			this._parent = parent || this._parent;
			if(this.el.parentNode == this._parent){
				return;
			}
			this._parent.appendChild(this.el);
			
			this.height = this._height;
			this.width = this._width;
			this.isVisible = true;
		},
   
		hide: function(){
			if(this.el.parentNode !== this._parent || !this._parent){
				return;
			}
			this._parent.removeChild(this.el);
			this.isVisible = false;
		},
		
		addClass: function(cls){
			var cl = cls.split(".");
			if(cl.length > 1){
				for(var i=0; i<cl.length; i++){
					this.addClass(cl[i]);
				}
				return;
			}
			
			
			if(!this.hasClass(cls)){
				this.el.className += " "+cls;
			}
		},
		
		removeClass: function(cls){
			var cl = cls.split(".");
			if(cl.length > 1){
				for(var i=0; i<cl.length; i++){
					this.removeClass(cl[i]);
				}
				return;
			}
			
			
			var c = this.el.className.split(" ");
			for(var i=0; i<c.length; i++){
				if(cls == c[i]){
					c[i] = c[c.length-1];
					c.length = c.length - 1;
				}
			}
			this.el.className = c.join(" ");
		},
		
		hasClass: function(cls){
			var c = this.el.className.split(" ");
			for(var i=0; i<c.length; i++){
				if(cls == c[i]){
					return true;
				}
			}
			return false;
		},
		
   
		update: function(){
			this.height = this._height;
			this.width = this._width;
			for(var i=0; i<this.children.length; i++){
				this.children[i].height = this.children[i]._height;
				this.children[i].width = this.children[i]._width;
			}
			
		},
   
		_x: 0,
		set x(val){
			this._x = val;
			this.style.left = val+"px";
			this.width = this._width;
		},
		get x(){
			return this._x;
		},
   
		_y: 0,
		set y(val){
			this._y = val;
			this.style.top = val+"px";
			this.height = this._height;
		},
		get y(){
			return this._y;
		},
   
		_height: 0,
		get height(){
			return this._height;
		},
		set height(val){
			this._height = val;
			
			if(!val){
				for(var i=0; i<this.children.length; i++){
					this.children[i].height = this.children[i]._height;
				}
				return;
			}
			
			//this.style.lineHeight = this._height+"px";
			this.style.height = "initial";
			this.style.bottom = 0;
			this.style.bottom = (this.el.offsetHeight - val)+"px";
			for(var i=0; i<this.children.length; i++){
				this.children[i].height = this.children[i]._height;
			}
		},
	
		_width: 0,
		get width(){
			return this._width;
		},
		set width(val){
			if(!val){
				return;
			}
			this._width = val;
			this.style.right = 0;
			this.style.right = (this.el.offsetWidth - val)+"px";
			for(var i=0; i<this.children.length; i++){
				this.children[i].width = this.children[i]._width;
			}
		},
   
		calcOffsetY: function(upTo){
			upTo = upTo || document.body;
			var ret = this.el.offsetTop;
			p = this.el.offsetParent;
			while(p && p != upTo){
				ret += p.offsetTop - p.scrollTop;
				p = p.offsetParent;
				
			}
			return ret;
		},
		calcOffsetX: function(upTo){
			upTo = upTo || document.body;
			var ret = this.el.offsetLeft;
			p = this.el.offsetParent;
			while(p && p != upTo){
				ret += p.offsetLeft - p.scrollLeft;
				p = p.offsetParent;
				
			}
			return ret;
		},
		ox: 0,
		oy: 0
		
	}
);