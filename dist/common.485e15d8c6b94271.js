"use strict";(self.webpackChunknector_farm=self.webpackChunknector_farm||[]).push([[592],{7876:(h,a,r)=>{r.d(a,{G:()=>i});var e=r(1571),l=r(6043),_=r(1627),g=r(6895),d=r(2019);function p(n,o){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"img",19),e.NdJ("error",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.setDefaultPic())}),e.qZA(),e.BQk()}if(2&n){const t=e.oxw();e.xp6(1),e.Q6J("src",t.fileImageUrl,e.LSH)}}function m(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"img",19),e.NdJ("error",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.setDefaultPic())}),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("src",t.fileUpload,e.LSH)}}const u=function(){return["/my-profile"]},f=function(){return["/notification"]};class i{constructor(o,t){this._commonService=o,this._httpService=t,this.toggle=!1,this.imgDefaultToggale=!1}ngOnInit(){this.fullName=this._commonService.getUserName(),null==this._commonService.getProfilePic()?this.setDefaultPic():this.fileImageUrl=`${this._httpService.BASE_URL}/api/profileImages/profile-images/download/${this._commonService.getProfilePic()}`}setDefaultPic(){this.fileImageUrl="https://i.ibb.co/wynJtDH/avatar.png"}change(){this.toggle=!this.toggle}logout(){this._commonService.logout().subscribe(o=>{200==o.status&&(localStorage.clear(),this._commonService.successToaster("Admin log out successfully!"))},o=>{}).add(()=>this._commonService.deleteSession())}}i.\u0275fac=function(o){return new(o||i)(e.Y36(l.v),e.Y36(_.O))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-header"]],decls:31,vars:7,consts:[[1,"row","d-flex","align-items-center","m-0"],[1,"col-6","text-start"],[1,"logo-header","d-flex","align-items-center","pl-3"],[1,"col-6","text-end"],[1,"dropdown","float-end"],[1,"header_right_side"],[4,"ngIf","ngIfElse"],["templateA",""],["id","dropdownMenuButton1","data-bs-toggle","dropdown",1,"user-drop","dropdown-toggle",2,"cursor","pointer"],["aria-labelledby","dropdownMenuButton1",1,"dropdown-menu","setting"],[1,"dropdown-item","login",3,"routerLink"],["src","../../../assets/img/person.svg","alt","",1,"imgColor"],[2,"font-size","15px"],[1,"dropdown-item","login",3,"click"],["src","../../../assets/img/logout.svg","alt",""],[1,"notification"],[1,"notification-count"],["title","Notification",3,"routerLink"],["src","../../../assets/img/notification.svg","alt",""],[1,"rounded-circle","profile_img_icon","p-1",3,"src","error"]],template:function(o,t){if(1&o&&(e.TgZ(0,"header")(1,"div",0)(2,"div",1)(3,"div",2),e._uU(4," Dashboard "),e.qZA()(),e.TgZ(5,"div",3)(6,"div",4)(7,"div",5),e.YNc(8,p,2,1,"ng-container",6),e.YNc(9,m,1,1,"ng-template",null,7,e.W1O),e.TgZ(11,"span",8),e._uU(12),e.qZA(),e.TgZ(13,"ul",9)(14,"li")(15,"a",10),e._UZ(16,"img",11),e._uU(17,"\xa0\xa0\xa0 "),e.TgZ(18,"span",12),e._uU(19,"Profile Setting"),e.qZA()()(),e.TgZ(20,"li")(21,"a",13),e.NdJ("click",function(){return t.logout()}),e._UZ(22,"img",14),e._uU(23,"\xa0\xa0\xa0 "),e.TgZ(24,"span",12),e._uU(25,"Logout"),e.qZA()()()(),e.TgZ(26,"div",15)(27,"p",16),e._uU(28,"2"),e.qZA(),e.TgZ(29,"a",17),e._UZ(30,"img",18),e.qZA()()()()()()()),2&o){const c=e.MAs(10);e.xp6(8),e.Q6J("ngIf",t.fileImageUrl)("ngIfElse",c),e.xp6(4),e.Oqu(t.fullName),e.xp6(3),e.Q6J("routerLink",e.DdM(5,u)),e.xp6(14),e.Q6J("routerLink",e.DdM(6,f))}},dependencies:[g.O5,d.rH],styles:[".dropdown-menu[_ngcontent-%COMP%]{margin-top:27px!important}.login[_ngcontent-%COMP%]{cursor:pointer;height:41px;padding-top:8px}.setting[_ngcontent-%COMP%]{cursor:pointer;padding-top:8px;width:65%}.nav-flex-end[_ngcontent-%COMP%]{justify-content:flex-end}.User_profile[_ngcontent-%COMP%]{float:right}.User_profile[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{padding:0}.drop-arrow[_ngcontent-%COMP%]{position:absolute;top:-13px;right:8px}.custom-top-dropdwon-menu[_ngcontent-%COMP%]{min-width:190px;top:70px}a.dropdown-item.logout-custom[_ngcontent-%COMP%]{background-color:#eb963d;color:#fff;text-align:left}.dropdown-menu.custom-top-dropdwon-menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding-bottom:10px;border-bottom:1px solid #dfdfdf;padding-top:10px}.img.active[_ngcontent-%COMP%]{color:red}.row-header[_ngcontent-%COMP%]{margin-right:none}"]})}}]);