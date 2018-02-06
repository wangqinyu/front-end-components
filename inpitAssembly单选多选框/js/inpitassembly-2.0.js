// * =====================================================================
// * 插件名：inpit_assembly
// * 作者：cababgelol
// * 技术支持：cababgelol.net/inpit-assembly/2.0/
// * =====================================================================
;(function(w) {
	var inpit_assembly = function(ele, opt) {
		this.$ele = ele,
			this.defaults = {
				event: "click",
				selected: "active", // 默认记号
				selected_data: [],
				ischeck_: true, // 是否在设置最少值初始最少选择数量
				ischeck_class: false,
				max: () => {},
				min: () => {},
				on: () => {},
				success: () => {}
			},
			this.options = $.extend({}, this.defaults, opt);
		},
		inpot_field = [];
	inpit_assembly.prototype = {
		//禁用
		ifdisabled: function(event, attr) {
			for(let i = 0; i < attr.length; i++) {
				let obj = this.$ele;
				for(let x of attr[i].data) {
					obj.find("[name=" + attr[i].name + "][value=" + x + "]").attr("disabled", "");
				}
			} 
		},
		//删除
		ifdelete: function(event, attr) {
			for(let i = 0; i < attr.length; i++) {
				let obj = this.$ele;
				for(let x of attr[i].data) {
					obj.find("[name][value=" + x + "]").remove()
				}
			}
		},
		//标记
		ifadd: function(event, attr) {
			for(let i = 0; i < attr.length; i++) {
				let obj = this.$ele;
				for(let x of attr[i].data) {
					var length = inpot_field[0].formname.split(",");
					
					for(let r = 0 ; r < length.length ; r++){
						
						let Element    	  = $("[name=" + attr[i].name + "][value=" + x + "]"),
							parentElement = Element.parents("[formname]");
							
						if( parentElement.attr("formname") == length[r] ){
							Element.addClass( inpot_field[0].sels )
						}
					}	
				}
			}
		},
		//标记
		ifremove: function(event, attr) {
			for(let i = 0; i < attr.length; i++) {
				let obj = this.$ele;
				for(let x of attr[i].data) {
					var length = inpot_field[0].formname.split(",");
					
					for(let r = 0 ; r < length.length ; r++){
						
						let Element    	  = $("[name=" + attr[i].name + "][value=" + x + "]"),
							parentElement = Element.parents("[formname]");
							
						if( parentElement.attr("formname") == length[r] ){
							Element.removeClass( inpot_field[0].sels )
						}
					}	
				}
			}
		},		
		// 选项开关
		iftoggle: function(event,attr) {
			for(let i = 0; i < attr.length; i++) {
				for(let x of attr[i].data) {
					var length = inpot_field[0].formname.split(",");
					
					for(let r = 0 ; r < length.length ; r++){
						
						let Element    	  = $("[name=" + attr[i].name + "][value=" + x + "]"),
							parentElement = Element.parents("[formname]");
							
						if( parentElement.attr("formname") == length[r] ){
							if(!Element.is("." + inpot_field[0].sels)){
								Element.addClass( inpot_field[0].sels )
							}else{
								Element.removeClass(inpot_field[0].sels)
							}
						}
					}										
				}
			}
		},
		fun: function() {
			var $this = this,
				$fun = this.options,
				$check_ = this.$ele,
				$check_formname = "formname",
				$check_class = (function(val) {
					var val = $fun.selected;
					if(val == undefined) {
						val = "active"
					}
					return val;
				})(),
				$check_index = 0;

			$fun.selected = this.options.selected;
			$fun.selected_data = this.options.selected_data;
			$fun.ischeck_ = this.options.ischeck_;
			$fun.ischeck_class = this.options.ischeck_class;
			$fun.event = this.options.event;

			//初始
			$check_.find("[radio],[checkbox]").each(function() {
				var this_ = $(this);
				this_.attr("index", $check_index);		

				// * ===============
				// * 筛选重复
				// * ===============
	
				Array.prototype.del = function() {
					let a = {},
						c = [],
						l = this.length;
					for(let i = 0; i < l; i++) {
						let b = this[i],
							d = (typeof b) + b;
						if(a[d] === undefined) {
							c.push(b);
							a[d] = 1;
						}
					}
					return c;
				}

				// * ===============
				// * selected_data的初始值
				// * ================					

				var obj_selected_data = $fun.selected_data[0];
				
				if(obj_selected_data != undefined) {
					
					let obj,
						selected_data = $fun.selected_data;
					
					for(let i = 0; i < selected_data.length; i++) {
						for(let x = 0; x < selected_data[i].data.length; x++) {
							let formname = $("[formname]");

							// * =============
							// * 相对
							// * =============

							if(typeof obj_selected_data.data == "object") {
								//选项
								var obj_option_ = $( (function(){
									let fr = selected_data[i].formname;
									if(fr != undefined)
										fr = "[formname=" + fr + "]";
									else if(fr == undefined)
										fr = "[formname]"
									return fr;
								})() +  " [name=" + selected_data[i].name + "][value=" + selected_data[i].data[x] + "]");
																
								// * ==============
								// * 区分单选与复选
								// * 单选保证仅有一个值，其余丢弃
								// * ==============
	
								// 单选
								if(typeof(formname.find("[index]").attr("checkbox")) != "undefined") {
									obj_option_.addClass($check_class);
								};
	
								// 复选
								if(typeof(formname.find("[index]").attr("radio")) != "undefined") {
									obj_option_.addClass($check_class);
								};								
								
							};

							// * =============
							// * 全选
							// * =============

							if(typeof obj_selected_data.data == "string" && obj_selected_data.data === "all") {
								obj_option_ = $("[formname=" + selected_data[i].name + "] [name][value]");
							};
						}
					}
				}
				
				// * ===============
				// * radio - 复选
				// * 初始值
				// * ================	
				
				if(this_.attr("radio") != undefined) {
					if($fun.ischeck_ && this_.attr("min") != undefined) {
						//存在min
						var obj = $check_.find(" > [index]").eq($check_index);
						if($fun.ischeck_class && $(this).find("[name]").eq(i).hasClass('ack')) {
							for(var i = 0; i < $(this).find("[name]").length; i++) {
								for(var i = 0; i < this_.attr("min"); i++) {
									obj.find("> *").eq(i).addClass($check_class);
								}
							}
						}
						if($fun.ischeck_class == false) {
							for(var i = 0; i < this_.attr("min"); i++) {
								this_.find("[name][value]").eq(i).addClass($check_class);
							}
						}
					}
				}

				// * ===============
				// * checkbox - 单选
				// * 初始值
				// * ================	

				if(this_.attr("checkbox") != undefined) {
					obj = $check_.find(" > [index]").eq($check_index);
					obj.find("> div").eq(0).addClass($check_class);
				}
				

				++$check_index;
			});
			
			+(function(){
				
				// * ==============
				// * 表单内部管理器
				// * name 表单名字
				// * sele 记号
				// * ==============
				
				var attr = {obj:$check_,sels:$check_class,formname:(function(){
					let name = "",i;
					for(i = 0; i < $check_.length ; i++){
						// console.log($check_[i].attributes["formname"].value)
						name += $check_[i].attributes["formname"].value + (function(){
							if(i == $check_.length - 1){return ""}
							else{return ","}
						})();
					}
					return name
				})()};
				
				inpot_field.push(attr)		
			}())
			
			//单选
			+($check_.on($fun.event, "[checkbox] [name][value]", function(event) {
				event.stopPropagation();
				var this_ = $(this),
					// * ===============
					// * 我忘记这是干嘛的
					// * this_siblings = this_.siblings(),  
					// * ================
					this_obj = this_.attr("name"),
					this_ack = $check_.find(" [name=" + this_obj + "]." + $check_class);

				if(this_.attr("disabled") != undefined) {
					$fun.on("disabled", ons(this_, $check_));
					return
				}

				if(this_ack.length > 0) {
					removeClass(this_ack, $check_class, $check_)
				}
				add_Class(this_, $check_class, $check_);
			}));

			//复选
			+($check_.on($fun.event, "[radio] [name][value]", function(event, max, min) {
				event.stopPropagation();
				var this_ = $(this),
					this_siblings = this_.siblings(),
					this_obj = this_siblings.attr("name"),
					this_ack = $check_.find(" [name=" + this_obj + "]." + $check_class);
				this_max = (function() {
					var max = this_.parent().attr("max");
					if(max == undefined)
						max = this_.parents().find("[name][value]").length + 1;
					return max;
				})();
				this_min = this_.parent().attr("min");

				if(this_.hasClass($check_class)) {
					//min
					removeClass(this_, $check_class, $check_);
					if(this_ack.length == this_min) {
						add_Class(this_, $check_class, $check_);
						$fun.min($check_, this_min);
					}

				} else {
					//mac
					if(this_max != undefined) {
						if(this_ack.length <= this_max) {
							add_Class(this_, $check_class, $check_);
							if(this_ack.length == this_max) {
								removeClass(this_, $check_class, $check_);
								$fun.max($check_, this_max);
							}
						}
					}
				}
				return [this_, this_max, this_min];
			}));

			// * ================
			// * S 工具类
			// * ================

			var attributeCount = function(obj) {
				var count = 0;
				for(var i in obj) {
					if(obj.hasOwnProperty(i)) {
						count++;
					}
				}
				return count;
			}

			// * ================
			// * 删除记号
			// * ================

			function removeClass(e, selected, object) {
				if(e.attr("disabled") == undefined) {
					if(e.attr("class").length <= selected.length) {
						e.removeAttr("class")
					} else {
						e.removeClass(selected)
					}

					$fun.on("rem", ons(e, object));
				}
			}

			// * ================
			// * 添加记号
			// * ================			

			function add_Class(e, selected, object) {
				if(e.attr("disabled") == undefined) {
					e.addClass(selected);
					$fun.on("add", ons(e, object));
				} else {
					$fun.on("disabled", ons(e, object));
				}
			}

			// * ================
			// * on 返回结构
			// * ================

			function ons(e, object) {
				return {
					this:{
						// 对象
						obj: e,
						// 类型
						type: (function() {
							let obj = e;
								if(obj.parents("[index]")[0].hasAttribute("checkbox"))
									return obj = "checkbox";
								if(obj.parents("[index]")[0].hasAttribute("radio"))
									return obj = "radio";
						})(),
						// 父
						parent: (function() {
							let val = object;
							if(val == undefined) {
								val = {}
							}
							return val;
						})(),
						// 数量
						length: e.length						
					},
					// 事件
					events:{
						event: $._data((object.get(0))) ,
						length: attributeCount($._data((object.get(0))).events)						
					}
				}
			}
			
			// * ===============
			// * 取type='inpit/assembly'内选择值
			// * val则最后结果
			// * ================			

			+(w.check_result = function(obj) {
				let val = [];
				if(obj != undefined) {
					$("[" + $check_formname + "=" + (function() {
						if(typeof obj == "string") {
							return obj;
						}
						if(typeof obj == "object") {
							return obj.parents("[formname]").attr($check_formname);
						}

					})() + "] [index]").each(function() {

						// * ===============
						// * checkbox - 单选
						// * ================				

						if($(this).is("[checkbox]")) {
							val.push($(this).find(" *." + $check_class).attr("value"));
						}

						// * ===============
						// * radio - 复选
						// * ================						

						if($(this).is("[radio]")) {
							$(this).find("*." + $check_class).each(function() {
								val.push(
									$(this).attr("value") //context.attributes.value.value
								);
							})
						}
					});
				} else {
					console.log("向check_result传入$(this)")
				}

				return [{
					"data": val.del()
				}, {
					"parameter": $fun
				}, {
					"obj": $check_
				}]
			});

			// * ================
			// * E 工具类
			// * ================
			
			$fun.success(JSON.stringify($check_))
		}
	};
	$.fn.inpitassembly = function(options, val) {
		var drag = new inpit_assembly(this, options);
		if(typeof options == "string") {
			switch(options) {
				case "disabled" || "DISABLED":
					drag.ifdisabled(this, val);
					break;

				case "delete" || "DELETE":
					drag.ifdelete(this, val);
					break;

				case "remove" || "REMOVE":
					drag.ifremove(this, val);
					break;
					
				case "add" || "ADD":
					drag.ifadd(this, val);
					break;				
				
				case "toggle" || "TOGGLE":
					drag.iftoggle(this,val);
					break;
			}
		} else if(typeof options == "object") {
			drag.fun();
		}
		return this;
	};
})(window);