$(function() {
	if(typeof host != "undefined"){
		loadUrl(host+'backend/getdisplay/beranda/main');
	}
});


function loadUrl(urls){
    $("#mainContainer").empty().addClass("loading");
	$.get(urls,function (html){
	    $("#mainContainer").html(html).removeClass("loading");
    });
}

function getClientHeight(){
	var theHeight;
	if (window.innerHeight)
		theHeight=window.innerHeight;
	else if (document.documentElement && document.documentElement.clientHeight) 
		theHeight=document.documentElement.clientHeight;
	else if (document.body) 
		theHeight=document.body.clientHeight;
	
	return theHeight;
}

var divcontainer;
function windowFormPanel(html,judul,width,height){
	divcontainer = $('#jendela');
	$(divcontainer).unbind();
	$('#isiJendela').html(html);
    $(divcontainer).window({
		title:judul,
		width:width,
		height:height,
		autoOpen:false,
		top: Math.round(frmHeight/2)-(height/2),
		left: Math.round(frmWidth/2)-(width/2),
		modal:true,
		maximizable:false,
		minimizable: false,
		collapsible: false,
		closable: true,
		resizable: false,
	    onBeforeClose:function(){	   
			$(divcontainer).window("close",true);
			//$(divcontainer).window("destroy",true);
			//$(divcontainer).window('refresh');
			return true;
	    }		
    });
    $(divcontainer).window('open');       
}
function windowFormClosePanel(){
    $(divcontainer).window('close');
	//$(divcontainer).window('refresh');
}

var container;
function windowForm(html,judul,width,height){
    container = "win"+Math.floor(Math.random()*9999);
    $("<div id="+container+"></div>").appendTo("body");
    container = "#"+container;
    $(container).html(html);
    $(container).css('padding','5px');
    $(container).window({
       title:judul,
       width:width,
       height:height,
       autoOpen:false,
       maximizable:false,
       minimizable: false,
	   collapsible: false,
       resizable: false,
       closable:true,
       modal:true,
	   onBeforeClose:function(){	   
			$(container).window("close",true);
			$(container).window("destroy",true);
			return true;
	   }
    });
    $(container).window('open');        
}
function closeWindow(){
    $(container).window('close');
    $(container).html("");
}


function getClientWidth(){
	var theWidth;
	if (window.innerWidth) 
		theWidth=window.innerWidth;
	else if (document.documentElement && document.documentElement.clientWidth) 
		theWidth=document.documentElement.clientWidth;
	else if (document.body) 
		theWidth=document.body.clientWidth;

	return theWidth;
}


function genGrid(modnya, divnya, lebarnya, tingginya, par1){
	if(lebarnya == undefined){
		lebarnya = getClientWidth-250;
	}
	if(tingginya == undefined){
		tingginya = getClientHeight-200;
	}

	var kolom ={};
	var frozen ={};
	var judulnya;
	var param={};
	var urlnya;
	var urlglobal="";
	var url_detil="";
	var post_detil={};
	var fitnya;
	var klik=false;
	var doble_klik=false;
	var pagesizeboy = 20;
	var singleSelek = true;
	var nowrap_nya = false;
	var footer=false;
	var rownumbernya=false;
	
	switch(modnya){
		case "phase":
			judulnya = "";
			urlnya = "phase";
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:90, halign:'center',align:'left', sortable:true},
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
			];
			kolom[modnya] = [	
				{field:'phase_name',title:'Phase Name',width:200, halign:'center',align:'left', sortable:true},
				{field:'phase_year',title:'Year',width:100, halign:'center',align:'center', sortable:true, resizable: true},
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true},
				{field:'publish',title:'Publish',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left',
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			];
		break;
		case "potype":
			judulnya = "";
			urlnya = "potype";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "pocurrency":
			judulnya = "";
			urlnya = "pocurrency";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:90, halign:'center',align:'left', sortable:true},
				{field:'currency',title:'Currency',width:150, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "region":
			judulnya = "";
			urlnya = "region";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:90, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "pone":
			judulnya = "";
			urlnya = "pone";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:90, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "sitename":
			judulnya = "";
			urlnya = "sitename";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:90, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		
		case "masterpo":
			judulnya = "";
			urlnya = "masterpo";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'po_no',title:'PO No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:200, halign:'center',align:'left', sortable:true},
				{field:'phase_year',title:'Year',width:100, halign:'center',align:'center', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:200, halign:'center',align:'center', sortable:true},
				{field:'currency',title:'Currency',width:150, halign:'center',align:'left', sortable:true},
				{field:'basic_contract',title:'Basic Contract',width:200, halign:'center',align:'left', sortable:true},
				{field:'po_date',title:'PO Date',width:100, halign:'center',align:'center', sortable:true},
				{field:'po_received',title:'PO Recived',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_delivery',title:'PO Delivery',width:100, halign:'center',align:'left', sortable:true},
				{field:'revision_no',title:'Revisi On No',width:100, halign:'center',align:'center', sortable:true},
				{field:'po_gross_idr',title:'PO Gross IDR',width:100, halign:'center',align:'right', sortable:true},
				{field:'po_nett_idr',title:'PO Nett IDR',width:100, halign:'center',align:'right', sortable:true},
				{field:'jis_dorr_rate',title:'Jis Dorr Rate',width:100, halign:'center',align:'right', sortable:true},
				{field:'po_gross_usd',title:'PO Gross USD',width:100, halign:'center',align:'right', sortable:true},
				{field:'po_nett_usd',title:'PO Nett USD',width:100, halign:'center',align:'right', sortable:true},
				{field:'remarks',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'file_name',title:'File Name',width:400, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "mastercr":
			judulnya = "";
			urlnya = "mastercr";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'cr_no_nokia',title:'CR No Nokia',width:200, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'cr_no_indosat',title:'CR No Indosat',width:200, halign:'center',align:'left', sortable:true},
				{field:'cr_status',title:'CR Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_code',title:'Phase Code',width:75, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:200, halign:'center',align:'left', sortable:true},
				{field:'phase_year',title:'Phase Year',width:50, halign:'center',align:'left', sortable:true},
				{field:'nodin',title:'NODIN',width:200, halign:'center',align:'left', sortable:true},
				{field:'cr_position',title:'CR Position',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_pic',title:'CR Pic',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_submit',title:'CR Submit',width:75, halign:'center',align:'left', sortable:true},
				{field:'cr_approved',title:'CR Approved',width:75, halign:'center',align:'left', sortable:true},
				{field:'po_received',title:'PO Received',width:75, halign:'center',align:'left', sortable:true},
				{field:'value_before',title:'Value Before',width:100, halign:'center',align:'right', sortable:true},
				{field:'value_after',title:'Value After',width:100, halign:'center',align:'right', sortable:true},
				{field:'value_delta',title:'Value Delta',width:100, halign:'center',align:'right', sortable:true},
				{field:'cr_type',title:'CR Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks',title:'Remarks',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'left', sortable:true},
				{field:'file_name',title:'File Name',width:400, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "uploadtracker":
			judulnya = "";
			urlnya = "uploadtracker";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'file_name',title:'File Name',width:400, halign:'center',align:'left', sortable:true},
				
			]
			kolom[modnya] = [
				{field:'type_tracker',title:'Type Upload',width:150, halign:'center',align:'left', sortable:true},
				{field:'type_upload',title:'New / Update',width:100, halign:'center',align:'left', sortable:true},
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
			]
		break;
		case "siteinfo":
			judulnya = "";
			urlnya = "siteinfo";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'SOW Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'area_name',title:'Area Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'cluster',title:'Cluster',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_detail',title:'SOW Detail',width:100, halign:'center',align:'left', sortable:true},
				{field:'system_key',title:'System Key',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_id_ori',title:'Site Ori',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name_ori',title:'Site Name Ori',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_boq',title:'Network BOQ',width:100, halign:'center',align:'left', sortable:true},
				{field:'wp_id_svc',title:'WP ID SVC',width:100, halign:'center',align:'left', sortable:true},
				{field:'so_svc',title:'SO SVC',width:100, halign:'center',align:'left', sortable:true},
				{field:'partner_ni',title:'Partner NI',width:100, halign:'center',align:'left', sortable:true},
				{field:'partner_npo',title:'Partner No',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_siteinfo',title:'Remarks',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:150, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:70, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "siteprogress":
			judulnya = "";
			urlnya = "siteprogress";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'SOW Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'rfi',title:'RFI',width:100, halign:'center',align:'left', sortable:true},
				{field:'tss',title:'TSS',width:100, halign:'center',align:'left', sortable:true},
				{field:'mos',title:'MOS',width:100, halign:'center',align:'left', sortable:true},
				{field:'installed',title:'Installed',width:100, halign:'center',align:'left', sortable:true},
				{field:'g900',title:'G900',width:100, halign:'center',align:'left', sortable:true},
				{field:'g1800',title:'G1800',width:100, halign:'center',align:'left', sortable:true},
				{field:'u2100',title:'U2100',width:100, halign:'center',align:'left', sortable:true},
				{field:'u900',title:'U900',width:100, halign:'center',align:'left', sortable:true},
				{field:'l1800',title:'L1800',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_baseline',title:'ON AIR Baseline',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_date',title:'ON AIR Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_week',title:'ON AIR Week',width:100, halign:'center',align:'left', sortable:true},
				{field:'atp_date',title:'ATP Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'atp_method',title:'ATP Method',width:100, halign:'center',align:'left', sortable:true},
				{field:'partner_ni',title:'Partner NI',width:100, halign:'center',align:'left', sortable:true},
				{field:'indosat_pic',title:'Indosat Pic',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "mcr":
			judulnya = "";
			urlnya = "mcr";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'SOW Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'alarm_submit',title:'Alarm Submit',width:100, halign:'center',align:'left', sortable:true},
				{field:'alarm_approved',title:'Alarm Approved',width:100, halign:'center',align:'left', sortable:true},
				{field:'ssv_fr_submit',title:'SSV FR Submit',width:100, halign:'center',align:'left', sortable:true},
				{field:'ssv_vr_approved',title:'SSV VR Approved',width:100, halign:'center',align:'left', sortable:true},
				{field:'ssv_frftr_submit',title:'SSV FR/FTR Submit',width:100, halign:'center',align:'left', sortable:true},
				{field:'ftr_srftr_approved',title:'FTR SR/FTR Approved',width:100, halign:'center',align:'left', sortable:true},
				{field:'pmr_lv_submit',title:'PMR LV Submit',width:100, halign:'center',align:'left', sortable:true},
				{field:'pmr_lv_approved',title:'PMR LV Approved',width:100, halign:'center',align:'left', sortable:true},
				{field:'rtwp_rssi',title:'RTWP RSSI',width:100, halign:'center',align:'left', sortable:true},
				{field:'hn_submit',title:'HN Submit',width:100, halign:'center',align:'left', sortable:true},
				{field:'hn_approved',title:'HN Approved',width:100, halign:'center',align:'left', sortable:true},
				{field:'mcr_submit',title:'MCR Submit',width:100, halign:'center',align:'left', sortable:true},
				{field:'mcr_exit',title:'MCR Exit',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "atf":
			judulnya = "";
			urlnya = "atf";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'SOW Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'atf_submit',title:'ATF Submit',width:100, halign:'center',align:'left', sortable:true},
				{field:'atf_approved1',title:'ATF Approved1',width:100, halign:'center',align:'left', sortable:true},
				{field:'dismantle',title:'Dismantle',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_pickup',title:'Material Pickup',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_inbound_nokia',title:'Material Inbound Nokia',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_inbound_isat',title:'Material Inbound Isat',width:100, halign:'center',align:'left', sortable:true},
				{field:'atf_approved2',title:'ATF Approved2',width:100, halign:'center',align:'left', sortable:true},
				{field:'atf_closed',title:'ATF Closed',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "sitebinder":
			judulnya = "";
			urlnya = "sitebinder";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'SOW Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'10_lld_ndb',title:'10. LLD/NDB',width:100, halign:'center',align:'left', sortable:true},
				{field:'22_tssr_pdf',title:'22. TSSR PDF',width:100, halign:'center',align:'left', sortable:true},
				{field:'23_sid_pdf',title:'23. SID PDF',width:100, halign:'center',align:'left', sortable:true},
				{field:'50_boq_pdf',title:'50. BOQ PDF',width:100, halign:'center',align:'left', sortable:true},
				{field:'56_atf_xls',title:'56. ATF XLS',width:100, halign:'center',align:'left', sortable:true},
				{field:'56_atf_pdf',title:'56. ATF PDF',width:100, halign:'center',align:'left', sortable:true},
				{field:'57_atp_functional',title:'57. ATP Functional',width:100, halign:'center',align:'left', sortable:true},
				{field:'57_atp_physical',title:'57. ATP Physical',width:100, halign:'center',align:'left', sortable:true},
				{field:'61_redline_pdf',title:'61. Redline PDF',width:100, halign:'center',align:'left', sortable:true},
				{field:'62_bd_dwg',title:'62. BD DWG',width:100, halign:'center',align:'left', sortable:true},
				{field:'63_abd_pdf',title:'63. ABD PDF',width:100, halign:'center',align:'left', sortable:true},
				{field:'xx_others',title:'XX. OTHERS',width:100, halign:'center',align:'left', sortable:true},
				{field:'xx_others2',title:'XX. OTHERS2',width:100, halign:'center',align:'left', sortable:true},
				{field:'doc_submit',title:'DOC SUBMIT',width:100, halign:'center',align:'left', sortable:true},
				{field:'reviewer',title:'RIVIEWER',width:100, halign:'center',align:'left', sortable:true},
				{field:'doc_accept',title:'DOC ACCEPT',width:100, halign:'center',align:'left', sortable:true},
				{field:'doc_status',title:'DOC STATUS',width:100, halign:'center',align:'left', sortable:true},
				{field:'70_ssv',title:'70. SSV',width:100, halign:'center',align:'left', sortable:true},
				{field:'71_rssi',title:'71. RSSI',width:100, halign:'center',align:'left', sortable:true},
				{field:'73_pmr',title:'73. PMR',width:100, halign:'center',align:'left', sortable:true},
				{field:'74_alarm_log',title:'74. ALARM LOG',width:100, halign:'center',align:'left', sortable:true},
				{field:'xx_others3',title:'XX. OTHERS3',width:100, halign:'center',align:'left', sortable:true},
				{field:'xx_others4',title:'XX. OTHERS4',width:100, halign:'center',align:'left', sortable:true},
				{field:'mcr_exit_accept',title:'MCR EXIT ACCEPT',width:100, halign:'center',align:'left', sortable:true},
				{field:'endorse_submit',title:'ENDORSE SUBMIT',width:100, halign:'center',align:'left', sortable:true},
				{field:'approver',title:'APPROVER',width:100, halign:'center',align:'left', sortable:true},
				{field:'endorse_approved',title:'ENDORSE APPROVED',width:100, halign:'center',align:'left', sortable:true},
				{field:'endorse_status',title:'ENDORSE STATUS',width:100, halign:'center',align:'left', sortable:true},
				{field:'dc_submit',title:'DC SUBMIT',width:100, halign:'center',align:'left', sortable:true},
				{field:'dc_reviewer',title:'DC RIVIEWER',width:100, halign:'center',align:'left', sortable:true},
				{field:'dc_approved',title:'DC APPROVED',width:100, halign:'center',align:'left', sortable:true},
				{field:'dc_status',title:'DC STATUS',width:100, halign:'center',align:'left', sortable:true},
				{field:'oa_to_atp',title:'AO TO ATP',width:100, halign:'center',align:'left', sortable:true},
				{field:'atp_to_submit',title:'ATP TO SUBMIT',width:100, halign:'center',align:'left', sortable:true},
				{field:'submit_to_accept',title:'SUBMIT TO ACCEPT',width:100, halign:'center',align:'left', sortable:true},
				{field:'accept_to_endorse',title:'ACCEPT TO ENDORSE',width:100, halign:'center',align:'left', sortable:true},
				{field:'endorse_to_dc_approved',title:'ENDORSE TO DC APPROVED',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks',title:'Remarks',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "acceptanceclosing":
			judulnya = "";
			urlnya = "acceptanceclosing";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'Boq No',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'Ne Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'Sow Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_date',title:'On Air Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'atp_date',title:'Atp Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'endorse_approved',title:'Endorse Approved',width:100, halign:'center',align:'left', sortable:true},
				{field:'mcr_exit_date',title:'Mcr Exit Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'mcr_exit_no',title:'Mcr Exit No',width:100, halign:'center',align:'left', sortable:true},
				{field:'pac_date',title:'Pac Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'pac_no',title:'Pac No',width:100, halign:'center',align:'left', sortable:true},
				{field:'fac_date',title:'Fac Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'fac_no',title:'Fac No',width:100, halign:'center',align:'left', sortable:true},
				{field:'top_certificate',title:'Top Certificate',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_certificate',title:'Remarks Certificate',width:100, halign:'center',align:'left', sortable:true},
				{field:'pmis_status',title:'Pmis Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'pmp_status',title:'Pmp Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'babt_submit',title:'Babt Submit',width:100, halign:'center',align:'left', sortable:true},
				{field:'babt_approved',title:'Babt Approved',width:100, halign:'center',align:'left', sortable:true},
				{field:'baut1_date',title:'Baut1 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'baut1_no',title:'Baut1 No',width:100, halign:'center',align:'left', sortable:true},
				{field:'bast1_date',title:'Bast1 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'baut2_date',title:'Baut2 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'baut2_no',title:'Baut2 No',width:100, halign:'center',align:'left', sortable:true},
				{field:'bast2_date',title:'Bast2 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'baut3_date',title:'Baut3 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'baut3_no',title:'Baut3 No',width:100, halign:'center',align:'left', sortable:true},
				{field:'bast3_date',title:'Bast3 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'top_baut',title:'Top Baut',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_baut',title:'Remarks Baut',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice1_date',title:'Invoice1 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice1_no',title:'Invoice1 No',width:100, halign:'center',align:'left', sortable:true},
				{field:'remittance1_date',title:'Remittance1 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice2_date',title:'Invoice2 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice2_no',title:'Invoice2 No',width:100, halign:'center',align:'left', sortable:true},
				{field:'remittance2_date',title:'Remittance2 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice3_date',title:'Invoice3 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice3_no',title:'Invoice3 No',width:100, halign:'center',align:'left', sortable:true},
				{field:'remittance3_date',title:'Remittance3 Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'top_invoice',title:'Top Invoice',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_invoice',title:'Remarks Invoice',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:100, halign:'center',align:'left', sortable:true},
			]
		break;
		case "costsales":
			judulnya = "";
			urlnya = "costsales";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'SOW Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_baseline',title:'On Air Baseline',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_date',title:'On Air Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'pac_baseline',title:'PAC Baseline',width:100, halign:'center',align:'left', sortable:true},
				{field:'pac_date2',title:'PAC Date2',width:100, halign:'center',align:'left', sortable:true},
				{field:'delay_no_onair',title:'Delay No On Air',width:100, halign:'center',align:'left', sortable:true},
				{field:'delay_on_days',title:'Delay On Days',width:100, halign:'center',align:'left', sortable:true},
				{field:'delay_no_pac',title:'Delay No Pac',width:100, halign:'center',align:'left', sortable:true},
				{field:'delay_on_days2',title:'Delay On Days2',width:100, halign:'center',align:'left', sortable:true},
				{field:'target_sales',title:'Target Sales',width:100, halign:'center',align:'left', sortable:true},
				{field:'actual_sales',title:'Actual Cost',width:100, halign:'center',align:'left', sortable:true},
				{field:'target_cost',title:'Target Cost',width:100, halign:'center',align:'left', sortable:true},
				{field:'actual_cost',title:'Actual Cost',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks',title:'Remarks',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:50, halign:'center',align:'left', sortable:true},
			]
		break;
		case "uploadalldatabase":
			judulnya = "";
			urlnya = "uploadalldatabase";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'file_name',title:'File Name',width:400, halign:'center',align:'left', sortable:true},
				
			]
			kolom[modnya] = [
				{field:'type_database',title:'Type Upload',width:150, halign:'center',align:'left', sortable:true},
				{field:'type_upload',title:'New / Update',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks',title:'Remark',width:200, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "receivedall":
			judulnya = "";
			urlnya = "receivedall";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'id_reff1',title:'ID Reff 1',width:100, halign:'center',align:'left', sortable:true},
				{field:'id_reff2',title:'ID Reff 2',width:100, halign:'center',align:'left', sortable:true},
				{field:'level',title:'Level',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_year',title:'Phase Year',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'pr_number',title:'PR Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'pr_line_item',title:'PR Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_no',title:'PO No',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'purchasing_group',title:'Purchasing Group',width:100, halign:'center',align:'left', sortable:true},
				{field:'document_type',title:'Document Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'vendor_account_number',title:'Vendor Account Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'contact_person',title:'Contact Person',width:100, halign:'center',align:'left', sortable:true},
				{field:'term_of_payment',title:'Term of Payment',width:100, halign:'center',align:'left', sortable:true},
				{field:'incoterms_code',title:'Incoterms Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'incoterms_location',title:'Incoterms Location',width:100, halign:'center',align:'left', sortable:true},
				{field:'currency',title:'Currency',width:100, halign:'center',align:'left', sortable:true},
				{field:'implementer',title:'Implementer',width:100, halign:'center',align:'left', sortable:true},
				{field:'manager',title:'Manager',width:100, halign:'center',align:'left', sortable:true},
				{field:'document_text_free_text_notes',title:'Document Text / Free Text (notes)',width:100, halign:'center',align:'left', sortable:true},
				{field:'collective_no',title:'Collective No.',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_type_header',title:'Discount Type (Header)',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_amount_percentage_header',title:'Discount Amount / Percentage (Header)',width:100, halign:'center',align:'left', sortable:true},
				{field:'collective_no',title:'Collective No',width:100, halign:'center',align:'left', sortable:true},
				{field:'line_item',title:'Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'requester',title:'Requester',width:100, halign:'center',align:'left', sortable:true},
				{field:'rfx_auction_number',title:'RFx / Auction Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'contract_number',title:'Contract Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'account_assignment_category',title:'Account Assignment Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_category',title:'Item Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'tax_code',title:'Tax Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_number',title:'Material Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'short_text',title:'Short Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_text',title:'Item Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'limit',title:'Limit',width:100, halign:'center',align:'left', sortable:true},
				{field:'materials_quantity',title:'Materials Quantity',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_price',title:'Material Price',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_group',title:'Material Group',width:100, halign:'center',align:'left', sortable:true},
				{field:'plant',title:'Plant',width:100, halign:'center',align:'left', sortable:true},
				{field:'delivery_date',title:'Delivery Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'require_gr',title:'Require GR',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice_receipt',title:'Invoice Receipt',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_type_item',title:'Discount Type (Item)',width:100, halign:'center',align:'left', sortable:true},
				{field:'amount_percentage_item',title:'Amount / percentage (Item)',width:100, halign:'center',align:'left', sortable:true},
				{field:'indicator',title:'Indicator',width:100, halign:'center',align:'left', sortable:true},
				{field:'assigned_to_line_item',title:'Assigned to Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'service_number',title:'Service Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'services_quantity',title:'Services Quantity',width:100, halign:'center',align:'left', sortable:true},
				{field:'gross_price',title:'Gross Price',width:100, halign:'center',align:'left', sortable:true},
				{field:'gl_account_number',title:'GL Account Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'business_area',title:'Business Area',width:100, halign:'center',align:'left', sortable:true},
				{field:'cost_center',title:'Cost Center',width:100, halign:'center',align:'left', sortable:true},
				{field:'wbs',title:'WBS',width:100, halign:'center',align:'left', sortable:true},
				{field:'internal_order',title:'Internal Order',width:100, halign:'center',align:'left', sortable:true},
				{field:'assets_number',title:'Assets Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_number',title:'Network Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'activity_number',title:'Activity Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'assigned_to_line_item2',title:'Assigned to Line Item2',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoicing_plan_date',title:'Invoicing Plan Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'percentage_to_be_invoiced',title:'Percentage (%) to be invoiced',width:100, halign:'center',align:'left', sortable:true},
				{field:'values_to_be_invoiced',title:'Values to be invoiced',width:100, halign:'center',align:'left', sortable:true},
				{field:'buyer',title:'Buyer',width:100, halign:'center',align:'left', sortable:true},
				{field:'basic_contract',title:'Basic Contract',width:100, halign:'center',align:'left', sortable:true},
				{field:'actual_qty',title:'Actual Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty',title:'Delta Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty',title:'Status CR Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarkscr',title:'RemarksCR',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_no_nokia',title:'CR No Nokia',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_status',title:'CR Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_gross_price',title:'materialgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_nett_price',title:'materialnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_gross_price',title:'totalgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_price',title:'totalnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_actual',title:'totalnetactual',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_delta',title:'totalnetdelta',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'ID Upload',width:100, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]			
		break;
		case "receiveddollar":
			judulnya = "";
			urlnya = "receiveddollar";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'level',title:'Level',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_no',title:'PO No',width:100, halign:'center',align:'left', sortable:true},
				{field:'line_item',title:'Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_number',title:'Material Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_text',title:'Item Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'short_text',title:'Short Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_number',title:'Network Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'materials_quantity',title:'Materials Quantity',width:100, halign:'center',align:'left', sortable:true},
				{field:'actual_qty',title:'Actual Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty',title:'Delta Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty',title:'Status CR Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarkscr',title:'RemarksCR',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_no_nokia',title:'CR No Nokia',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_status',title:'CR Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'currency',title:'Currency',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_gross_price',title:'materialgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_nett_price',title:'materialnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_gross_price',title:'totalgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_price',title:'totalnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_actual',title:'totalnetactual',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_delta',title:'totalnetdelta',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'ID Upload',width:100, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]		
		break;
		case "received":
			judulnya = "";
			urlnya = "received";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'level',title:'Level',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_no',title:'PO No',width:100, halign:'center',align:'left', sortable:true},
				{field:'line_item',title:'Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_number',title:'Material Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_text',title:'Item Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'short_text',title:'Short Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_number',title:'Network Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'materials_quantity',title:'Materials Quantity',width:100, halign:'center',align:'left', sortable:true},
				{field:'actual_qty',title:'Actual Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty',title:'Delta Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty',title:'Status CR Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarkscr',title:'RemarksCR',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_no_nokia',title:'CR No Nokia',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_status',title:'CR Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'ID Upload',width:100, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "reservationall":
			judulnya = "";
			urlnya = "reservationall";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'id_reff1',title:'ID Reff 1',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				
				{field:'id_reff2',title:'ID Reff 2',width:100, halign:'center',align:'left', sortable:true},
				{field:'level',title:'Level',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_year',title:'Phase Year',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'pr_number',title:'PR Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'pr_line_item',title:'PR Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_no',title:'PO No',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'purchasing_group',title:'Purchasing Group',width:100, halign:'center',align:'left', sortable:true},
				{field:'document_type',title:'Document Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'vendor_account_number',title:'Vendor Account Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'contact_person',title:'Contact Person',width:100, halign:'center',align:'left', sortable:true},
				{field:'term_of_payment',title:'Term of Payment',width:100, halign:'center',align:'left', sortable:true},
				{field:'incoterms_code',title:'Incoterms Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'incoterms_location',title:'Incoterms Location',width:100, halign:'center',align:'left', sortable:true},
				{field:'currency',title:'Currency',width:100, halign:'center',align:'left', sortable:true},
				{field:'implementer',title:'Implementer',width:100, halign:'center',align:'left', sortable:true},
				{field:'manager',title:'Manager',width:100, halign:'center',align:'left', sortable:true},
				{field:'document_text_free_text_notes',title:'Document Text / Free Text (notes)',width:100, halign:'center',align:'left', sortable:true},
				{field:'collective_no',title:'Collective No',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_type_header',title:'Discount Type (Header)',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_amount_percentage_header',title:'Discount Amount / Percentage (Header)',width:100, halign:'center',align:'left', sortable:true},
				{field:'line_item',title:'Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'requester',title:'Requester',width:100, halign:'center',align:'left', sortable:true},
				{field:'rfx_auction_number',title:'RFx / Auction Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'contract_number',title:'Contract Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'account_assignment_category',title:'Account Assignment Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_category',title:'Item Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'tax_code',title:'Tax Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_number',title:'Material Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'short_text',title:'Short Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_text',title:'Item Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'limit',title:'Limit',width:100, halign:'center',align:'left', sortable:true},
				{field:'materials_quantity',title:'Materials Quantity',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_price',title:'Material Price',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_group',title:'Material Group',width:100, halign:'center',align:'left', sortable:true},
				{field:'plant',title:'Plant',width:100, halign:'center',align:'left', sortable:true},
				{field:'delivery_date',title:'Delivery Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'require_gr',title:'Require GR',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice_receipt',title:'Invoice Receipt',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_type_item',title:'Discount Type (Item)',width:100, halign:'center',align:'left', sortable:true},
				{field:'amount_percentage_item',title:'Amount / percentage (Item)',width:100, halign:'center',align:'left', sortable:true},
				{field:'indicator',title:'Indicator',width:100, halign:'center',align:'left', sortable:true},
				{field:'assigned_to_line_item',title:'Assigned to Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'service_number',title:'Service Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'services_quantity',title:'Services Quantity',width:100, halign:'center',align:'left', sortable:true},
				{field:'gross_price',title:'Gross Price',width:100, halign:'center',align:'left', sortable:true},
				{field:'gl_account_number',title:'GL Account Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'business_area',title:'Business Area',width:100, halign:'center',align:'left', sortable:true},
				{field:'cost_center',title:'Cost Center',width:100, halign:'center',align:'left', sortable:true},
				{field:'wbs',title:'WBS',width:100, halign:'center',align:'left', sortable:true},
				{field:'internal_order',title:'Internal Order',width:100, halign:'center',align:'left', sortable:true},
				{field:'assets_number',title:'Assets Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_number',title:'Network Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'activity_number',title:'Activity Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'assigned_to_line_item2',title:'Assigned to Line Item2',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoicing_plan_date',title:'Invoicing Plan Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'percentage_to_be_invoiced',title:'Percentage (%) to be invoiced',width:100, halign:'center',align:'left', sortable:true},
				{field:'values_to_be_invoiced',title:'Values to be invoiced',width:100, halign:'center',align:'left', sortable:true},
				{field:'buyer',title:'Buyer',width:100, halign:'center',align:'left', sortable:true},
				{field:'basic_contract',title:'Basic Contract',width:100, halign:'center',align:'left', sortable:true},
				{field:'actual_qty',title:'Actual Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty',title:'Delta Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty',title:'Status CR Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarkscr',title:'RemarksCR',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_no_nokia',title:'CR No Nokia',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_status',title:'CR Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_gross_price',title:'materialgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_nett_price',title:'materialnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_gross_price',title:'totalgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_price',title:'totalnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_actual',title:'totalnetactual',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_delta',title:'totalnetdelta',width:100, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'boqno',width:100, halign:'center',align:'left', sortable:true},
				{field:'siteid',title:'siteid',width:100, halign:'center',align:'left', sortable:true},
				{field:'sitename',title:'sitename',width:100, halign:'center',align:'left', sortable:true},
				{field:'regioncode',title:'regioncode',width:100, halign:'center',align:'left', sortable:true},
				{field:'networkboq',title:'networkboq',width:100, halign:'center',align:'left', sortable:true},
				{field:'wpidsvc',title:'wpidsvc',width:100, halign:'center',align:'left', sortable:true},
				{field:'plan_qty_mapping',title:'Plan Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'aqtual_qty_mapping',title:'Actual Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty_mapping',title:'Delta Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty_mapping',title:'Status CR Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_reloc_mapping',title:'Status CR Reloc Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_cr_mapping',title:'RemarksCR Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_cr_reloc_mapping',title:'RemarksCR Reloc Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_gross_price_mapping',title:'totalgrossprice Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_price_mapping',title:'totalnettprice Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_actual_mapping',title:'totalnetactual Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_delta_mapping',title:'totalnetdelta Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'boqno_old',title:'Boqno old',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_id_old',title:'siteid old',width:100, halign:'center',align:'left', sortable:true},
				{field:'sitename_old',title:'sitename old',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code_old',title:'regioncode old',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'ID Upload',width:100, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "reservationdollar":
			judulnya = "";
			urlnya = "reservationdollar";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'level',title:'Level',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'boqno',width:100, halign:'center',align:'left', sortable:true},
				{field:'siteid',title:'siteid',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'sitename',width:100, halign:'center',align:'left', sortable:true},
				{field:'regioncode',title:'regioncode',width:100, halign:'center',align:'left', sortable:true},
				{field:'networkboq',title:'networkboq',width:100, halign:'center',align:'left', sortable:true},
				{field:'wpidsvc',title:'wpidsvc',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_no',title:'PO No',width:100, halign:'center',align:'left', sortable:true},
				{field:'line_item',title:'Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_number',title:'Material Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_text',title:'Item Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'short_text',title:'Short Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_number',title:'Network Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'plan_qty_mapping',title:'Plan Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'aqtual_qty_mapping',title:'Actual Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty_mapping',title:'Delta Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty_mapping',title:'Status CR Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_reloc_mapping',title:'Status CR Reloc Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_cr_mapping',title:'RemarksCR Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_cr_reloc_mapping',title:'RemarksCR Reloc Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'currency',title:'Currency',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_gross_price',title:'materialgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_nett_price',title:'materialnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_gross_price',title:'totalgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_price',title:'totalnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_actual',title:'totalnetactual',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_delta',title:'totalnetdelta',width:100, halign:'center',align:'left', sortable:true},
				{field:'boqno_old',title:'boqno old',width:100, halign:'center',align:'left', sortable:true},
				{field:'siteid_old',title:'siteid old',width:100, halign:'center',align:'left', sortable:true},
				{field:'sitename_old',title:'sitename old',width:100, halign:'center',align:'left', sortable:true},
				{field:'regioncode_old',title:'regioncode old',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'ID Upload',width:100, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "reservation":
			judulnya = "";
			urlnya = "reservation";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'level',title:'Level',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'boqno',width:100, halign:'center',align:'left', sortable:true},
				{field:'siteid',title:'siteid',width:100, halign:'center',align:'left', sortable:true},
				{field:'sitename',title:'sitename',width:100, halign:'center',align:'left', sortable:true},
				{field:'regioncode',title:'regioncode',width:100, halign:'center',align:'left', sortable:true},
				{field:'networkboq',title:'networkboq',width:100, halign:'center',align:'left', sortable:true},
				{field:'wpidsvc',title:'wpidsvc',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_no',title:'PO No',width:100, halign:'center',align:'left', sortable:true},
				{field:'line_item',title:'Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_number',title:'Material Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_text',title:'Item Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'short_text',title:'Short Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_number',title:'Network Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'plan_qty_mapping',title:'Plan Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'aqtual_qty_mapping',title:'Actual Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty_mapping',title:'Delta Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty_mapping',title:'Status CR Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_reloc_mapping',title:'Status CR Reloc Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_cr_mapping',title:'RemarksCR Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_cr_reloc_mapping',title:'RemarksCR Reloc Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'ID Upload',width:100, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "mapping":
			judulnya = "";
			urlnya = "mapping";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:70, halign:'center',align:'left', sortable:true},
				{field:'id_reff1',title:'IDReff1',width:70, halign:'center',align:'left', sortable:true},
				{field:'level',title:'Lev',width:25, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_year',title:'Phase Year',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:200, halign:'center',align:'left', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'pr_number',title:'PR Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'pr_line_item',title:'PR Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_no',title:'PO No',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:200, halign:'center',align:'left', sortable:true},
				{field:'purchasing_group',title:'Purchasing Group',width:100, halign:'center',align:'left', sortable:true},
				{field:'document_type',title:'Document Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'vendor_account_number',title:'Vendor Account Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'contact_person',title:'Contact Person',width:100, halign:'center',align:'left', sortable:true},
				{field:'term_of_payment',title:'Term of Payment',width:100, halign:'center',align:'left', sortable:true},
				{field:'incoterms_code',title:'Incoterms Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'incoterms_location',title:'Incoterms Location',width:100, halign:'center',align:'left', sortable:true},
				{field:'currency',title:'Currency',width:100, halign:'center',align:'left', sortable:true},
				{field:'implementer',title:'Implementer',width:100, halign:'center',align:'left', sortable:true},
				{field:'manager',title:'Manager',width:100, halign:'center',align:'left', sortable:true},
				{field:'document_text_free_text_notes',title:'Document Text / Free Text (notes)',width:100, halign:'center',align:'left', sortable:true},
				{field:'collective_no',title:'Collective No',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_type_header',title:'Discount Type (Header)',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_amount_percentage_header',title:'Discount Amount / Percentage (Header)',width:100, halign:'center',align:'left', sortable:true},
				{field:'line_item',title:'Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'requester',title:'Requester',width:100, halign:'center',align:'left', sortable:true},
				{field:'rfx_auction_number',title:'RFx / Auction Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'contract_number',title:'Contract Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'account_assignment_category',title:'Account Assignment Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_category',title:'Item Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'tax_code',title:'Tax Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_number',title:'Material Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'short_text',title:'Short Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'item_text',title:'Item Text',width:100, halign:'center',align:'left', sortable:true},
				{field:'limit',title:'Limit',width:100, halign:'center',align:'left', sortable:true},
				{field:'materials_quantity',title:'Materials Quantity',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_price',title:'Material Price',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_group',title:'Material Group',width:100, halign:'center',align:'left', sortable:true},
				{field:'plant',title:'Plant',width:100, halign:'center',align:'left', sortable:true},
				{field:'delivery_date',title:'Delivery Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'require_gr',title:'Require GR',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoice_receipt',title:'Invoice Receipt',width:100, halign:'center',align:'left', sortable:true},
				{field:'discount_type_item',title:'Discount Type (Item)',width:100, halign:'center',align:'left', sortable:true},
				{field:'amount_percentage_item',title:'Amount / percentage (Item)',width:100, halign:'center',align:'left', sortable:true},
				{field:'indicator',title:'Indicator',width:100, halign:'center',align:'left', sortable:true},
				{field:'assigned_to_line_item',title:'Assigned to Line Item',width:100, halign:'center',align:'left', sortable:true},
				{field:'service_number',title:'Service Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'services_quantity',title:'Services Quantity',width:100, halign:'center',align:'left', sortable:true},
				{field:'gross_price',title:'Gross Price',width:100, halign:'center',align:'left', sortable:true},
				{field:'gl_account_number',title:'GL Account Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'business_area',title:'Business Area',width:100, halign:'center',align:'left', sortable:true},
				{field:'cost_center',title:'Cost Center',width:100, halign:'center',align:'left', sortable:true},
				{field:'wbs',title:'WBS',width:100, halign:'center',align:'left', sortable:true},
				{field:'internal_order',title:'Internal Order',width:100, halign:'center',align:'left', sortable:true},
				{field:'assets_number',title:'Assets Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_number',title:'Network Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'activity_number',title:'Activity Number',width:100, halign:'center',align:'left', sortable:true},
				{field:'assigned_to_line_item2',title:'Assigned to Line Item2',width:100, halign:'center',align:'left', sortable:true},
				{field:'invoicing_plan_date',title:'Invoicing Plan Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'percentage_to_be_invoiced',title:'Percentage (%) to be invoiced',width:100, halign:'center',align:'left', sortable:true},
				{field:'values_to_be_invoiced',title:'Values to be invoiced',width:100, halign:'center',align:'left', sortable:true},
				{field:'buyer',title:'Buyer',width:100, halign:'center',align:'left', sortable:true},
				{field:'basic_contract',title:'Basic Contract',width:100, halign:'center',align:'left', sortable:true},
				{field:'actual_qty',title:'Actual Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty',title:'Delta Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty',title:'Status CR Qty',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarkscr',title:'RemarksCR',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_no_nokia',title:'CR No Nokia',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_status',title:'CR Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_gross_price',title:'materialgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'material_nett_price',title:'materialnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_gross_price',title:'totalgrossprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_price',title:'totalnettprice',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_actual',title:'totalnetactual',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_delta',title:'totalnetdelta',width:100, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'boqno',width:100, halign:'center',align:'left', sortable:true},
				{field:'siteid',title:'siteid',width:100, halign:'center',align:'left', sortable:true},
				{field:'sitename',title:'sitename',width:100, halign:'center',align:'left', sortable:true},
				{field:'regioncode',title:'regioncode',width:100, halign:'center',align:'left', sortable:true},
				{field:'networkboq',title:'networkboq',width:100, halign:'center',align:'left', sortable:true},
				{field:'wpidsvc',title:'wpidsvc',width:100, halign:'center',align:'left', sortable:true},
				{field:'plan_qty_mapping',title:'Plan Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'aqtual_qty_mapping',title:'Actual Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'delta_qty_mapping',title:'Delta Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_qty_mapping',title:'Status CR Qty Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'status_cr_reloc_mapping',title:'Status CR Reloc Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_cr_mapping',title:'RemarksCR Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_cr_reloc_mapping',title:'RemarksCR Reloc Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_gross_price_mapping',title:'totalgrossprice Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_price_mapping',title:'totalnettprice Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_nett_actual_mapping',title:'totalnetactual Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'total_net_delta_mapping',title:'totalnetdelta Mapping',width:100, halign:'center',align:'left', sortable:true},
				{field:'boqno_old',title:'Boqno old',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_id_old',title:'siteid old',width:100, halign:'center',align:'left', sortable:true},
				{field:'sitename_old',title:'sitename old',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code_old',title:'regioncode old',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'ID Upload',width:100, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "boqpersite":
			judulnya = "";
			urlnya = "boqpersite";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [

			]
		break;
		
		
		//modul User Management
		case "userlist":
			judulnya = "";
			urlnya = "userlist";
			urlglobal = host+'backend/getdata/'+urlnya;
			rownumbernya = true;
			frozen[modnya] = [
				{field:'nama_user',title:'Username',width:150, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'group_user',title:'User Group',width:200, halign:'center',align:'left', sortable:true},
				{field:'nama_lengkap',title:'Nama Lengkap',width:300, halign:'center',align:'left', sortable:true},
				{field:'email',title:'Email',width:200, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left',
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},				
			]
		break;
		case "grouplist":
			judulnya = "";
			urlnya = "grouplist";
			urlglobal = host+'backend/getdata/'+urlnya;
			rownumbernya = true;
			kolom[modnya] = [
				{field:'group_user',title:'User Group',width:200, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:150, halign:'center',align:'center',
					formatter: function(value,row,index){
						if (row.status == 1){
							return "<font color='green'>Group Active</font>";
						} else {
							return "<font color='red'>Group Inactive</font>";
						}
					}
				},
				{field:'id',title:'Access Management',width:150,halign:'center',align:'center',
					formatter:function(value,rowData,rowIndex){
						return '<button href="javascript:void(0)" onClick="kumpulAction(\'userrole\',\''+rowData.id+'\',\''+rowData.group_user+'\')" class="easyui-linkbutton" data-options="iconCls:\'icon-save\'">Set Up</button>';
					}
				},				
			]
		break;
		//End modul User Management
	}
	
	grid_nya=$("#"+divnya).datagrid({
		title:judulnya,
		width: '100%',
		height: '100%',
		rownumbers:rownumbernya,
		iconCls:'database',
        fit:fitnya,
        striped:true,
        pagination:true,
        remoteSort: false,
		showFooter:footer,
		singleSelect:singleSelek,
        url: urlglobal,		
		nowrap: nowrap_nya,
		pageSize:pagesizeboy,
		pageList:[20,50,100,200],
		queryParams:param,
		frozenColumns:[
            frozen[modnya]
        ],
		columns:[
            kolom[modnya]
        ],
		onClickRow:function(rowIndex,rowData){
		 
        },
		onDblClickRow:function(rowIndex,rowData){
			if(doble_klik==true){
				switch(modnya){
					case "list_produk_kasir":
					break;
				}
			}
		},
		//toolbar: '#tb_'+modnya,
		rowStyler: function(index,row){
			if (row.status == 0){
				return 'background-color:#FFD1BB;'; // return inline style
			}
			
		},
		onLoadSuccess: function(data){
			if(data.total == 0){
				var $panel = $(this).datagrid('getPanel');
				var $info = '<div class="info-empty" style="margin-top:18%;">No Data Available</div>';
				$($panel).find(".datagrid-view").append($info);
			}else{
				$('.info-empty').remove();
			}
		},
	});
}

function genGridEditable(modnya, divnya, lebarnya, tingginya, crud_table){
	var data_dumi=[{"id":'fixed',"text":"fixed"}];
	if(lebarnya == undefined){
		lebarnya = getClientWidth-250;
	}
	if(tingginya == undefined){
		tingginya = getClientHeight-300
	}
	
	var kolom ={};
	var frozen ={};
	var judulnya;
	var urlnya;
	var urlglobal="";
	var param={};
	var footer=false;
	var pagesizeboy=20;
	var paging=true;	
	var fitnya=true;
	var url_crud = host+"backend/simpansavedata/"+crud_table;

	switch (modnya){
		case "masterpo":
			judulnya = "";
			urlnya = "masterpo";
			fitnya = true;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
			]			
			kolom[modnya] = [
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:200, halign:'center',align:'left', sortable:true},
				{field:'phase_year',title:'Year',width:100, halign:'center',align:'center', sortable:true},
				{field:'po_type',title:'PO Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'project_name',title:'Project Name',width:200, halign:'center',align:'center', sortable:true,
					editor:{type:'textbox'}
				},
				{field:'currency',title:'Currency',width:150, halign:'center',align:'left', sortable:true},
				{field:'basic_contract',title:'Basic Contract',width:200, halign:'center',align:'left', sortable:true},
				{field:'po_date',title:'PO Date',width:100, halign:'center',align:'center', sortable:true},
				{field:'po_received',title:'PO Recived',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_delivery',title:'PO Delivery',width:100, halign:'center',align:'left', sortable:true},
				{field:'revision_no',title:'Revisi On No',width:100, halign:'center',align:'center', sortable:true},
				{field:'po_gross_idr',title:'PO Gross IDR',width:100, halign:'center',align:'right', sortable:true},
				{field:'po_nett_idr',title:'PO Nett IDR',width:100, halign:'center',align:'right', sortable:true},
				{field:'jis_dorr_rate',title:'Jis Dorr Rate',width:100, halign:'center',align:'right', sortable:true},
				{field:'po_gross_usd',title:'PO Gross USD',width:100, halign:'center',align:'right', sortable:true},
				{field:'po_nett_usd',title:'PO Nett USD',width:100, halign:'center',align:'right', sortable:true},
				{field:'remarks',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'file_name',title:'File Name',width:200, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
		case "mastercr":
			judulnya = "";
			urlnya = "mastercr";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'cr_no_nokia',title:'CR No Nokia',width:200, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'cr_no_indosat',title:'CR No Indosat',width:200, halign:'center',align:'left', sortable:true},
				{field:'cr_status',title:'CR Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_code',title:'Phase Code',width:75, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:200, halign:'center',align:'left', sortable:true},
				{field:'phase_year',title:'Phase Year',width:50, halign:'center',align:'left', sortable:true},
				{field:'nodin',title:'NODIN',width:200, halign:'center',align:'left', sortable:true},
				{field:'cr_position',title:'CR Position',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_pic',title:'CR Pic',width:100, halign:'center',align:'left', sortable:true},
				{field:'cr_submit',title:'CR Submit',width:75, halign:'center',align:'left', sortable:true},
				{field:'cr_approved',title:'CR Approved',width:75, halign:'center',align:'left', sortable:true},
				{field:'po_received',title:'PO Received',width:75, halign:'center',align:'left', sortable:true},
				{field:'value_before',title:'Value Before',width:100, halign:'center',align:'right', sortable:true},
				{field:'value_after',title:'Value After',width:100, halign:'center',align:'right', sortable:true},
				{field:'value_delta',title:'Value Delta',width:100, halign:'center',align:'right', sortable:true},
				{field:'cr_type',title:'CR Type',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks',title:'Remarks',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'left', sortable:true},
				{field:'file_name',title:'File Name',width:400, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:100, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;	
		case "siteinfo":
			judulnya = "";
			urlnya = "siteinfo";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'id',title:'ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'SOW Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'area_name',title:'Area Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'cluster',title:'Cluster',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_code',title:'Phase Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'phase_name',title:'Phase Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_detail',title:'SOW Detail',width:100, halign:'center',align:'left', sortable:true},
				{field:'system_key',title:'System Key',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_id_ori',title:'Site Ori',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name_ori',title:'Site Name Ori',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'network_boq',title:'Network BOQ',width:100, halign:'center',align:'left', sortable:true},
				{field:'wp_id_svc',title:'WP ID SVC',width:100, halign:'center',align:'left', sortable:true},
				{field:'so_svc',title:'SO SVC',width:100, halign:'center',align:'left', sortable:true},
				{field:'partner_ni',title:'Partner NI',width:100, halign:'center',align:'left', sortable:true},
				{field:'partner_npo',title:'Partner No',width:100, halign:'center',align:'left', sortable:true},
				{field:'remarks_siteinfo',title:'Remarks',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:150, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:70, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;	
		case "siteprogress":
			judulnya = "";
			urlnya = "siteprogress";
			//height = 800;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [
				{field:'id',title:'ID',width:60, halign:'center',align:'left', sortable:true},
				{field:'boqno',title:'BOQ No',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [
				{field:'site_id',title:'Site ID',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_name',title:'Site Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'sow_category',title:'SOW Category',width:100, halign:'center',align:'left', sortable:true},
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
				{field:'rfi',title:'RFI',width:100, halign:'center',align:'left', sortable:true},
				{field:'tss',title:'TSS',width:100, halign:'center',align:'left', sortable:true},
				{field:'mos',title:'MOS',width:100, halign:'center',align:'left', sortable:true},
				{field:'installed',title:'Installed',width:100, halign:'center',align:'left', sortable:true},
				{field:'g900',title:'G900',width:100, halign:'center',align:'left', sortable:true},
				{field:'g1800',title:'G1800',width:100, halign:'center',align:'left', sortable:true},
				{field:'u2100',title:'U2100',width:100, halign:'center',align:'left', sortable:true},
				{field:'u900',title:'U900',width:100, halign:'center',align:'left', sortable:true},
				{field:'l1800',title:'L1800',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_baseline',title:'ON AIR Baseline',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_date',title:'ON AIR Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'on_air_week',title:'ON AIR Week',width:100, halign:'center',align:'left', sortable:true},
				{field:'atp_date',title:'ATP Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'atp_method',title:'ATP Method',width:100, halign:'center',align:'left', sortable:true},
				{field:'partner_ni',title:'Partner NI',width:100, halign:'center',align:'left', sortable:true},
				{field:'indosat_pic',title:'Indosat Pic',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:100, halign:'center',align:'left', sortable:true},
				{field:'uploader_id',title:'Uploader ID',width:50, halign:'center',align:'left', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left', sortable:true,
					formatter: function(value,row,index){
						if (row.status == 1){
							return "Active";
						} else {
							return "Inactive";
						}
					}
				},
			]
		break;
	
		case "tbl_employees":
			judulnya = "";
			urlnya = "tbl_emp_act";
			fitnya = true;
			kolom[modnya] = [	
				{field:'costcenter_desc',title:'Cost Center',width:100, halign:'center',align:'left',
					editor:{type:'validatebox',options:{}}
				},
				{field:'employee_id',title:'Emp. ID',width:80, halign:'center',align:'center'},
				{field:'name_na',title:'Employee Name',width:180, halign:'center',align:'left'},
				{field:'cost_nbr',title:'Cost',width:100, halign:'center',align:'right'},
				{field:'percent',title:'%',width:50, halign:'center',align:'right',
					
					editor:{type:'numberbox',options:{precision:1,value:0,min:0,max:100}}
				},
				{field:'quantity',title:'Quantity',width:100, halign:'center',align:'right',
					editor:{type:'numberbox',options:{ value:0 }}
				},
				{field:'cost_type',title:'Cost Type',width:100, halign:'center',align:'right',
					editor:{
                       type:'combobox',
                       options:{
                           valueField:'id',
                           textField:'value',
						   data: [{
								id: 'Fixed',
								value: 'Fixed'
							}]
                          // method:'get',
                          // url:'products.json',
                          // required:true
                       }
                    }
				},
				{field:'budget_type',title:'Budget',width:100, halign:'center',align:'right',
					editor:{
                       type:'combobox',
                       options:{
                           valueField:'id',
                           textField:'value',
						   data: [{
								id: 'Fixed',
								value: 'Fixed'
							}]
                          // method:'get',
                          // url:'products.json',
                          // required:true
                       }
                    }
				},
				{field:'input_rate',title:'Input Rate',width:80, halign:'center',align:'right',
					editor:{type:'numberbox',options:{value:0}}
				},
				{field:'output_rate',title:'Output Rate',width:80, halign:'center',align:'right',
					editor:{type:'numberbox',options:{value:0}}
				},
			]
		break;
	}
	
	$("#"+divnya).edatagrid({
		title:judulnya,
        height:tingginya,
        width:lebarnya,
		rownumbers:true,
		iconCls:'database',
        fit:fitnya,
        striped:true,
        pagination:paging,
       // pagination:true,
		pageSize:pagesizeboy,
		pageList:[10,20,30,40,50,75,100,200],
        remoteSort: false,
        //showFooter: true,
		url: (urlglobal == "" ? host+"backend/getdata/"+urlnya : urlglobal),		
		saveUrl: url_crud+'/add',
        updateUrl: url_crud+'/edit',
        destroyUrl: url_crud+'/delete',
		nowrap: true,
        singleSelect:true,
		queryParams:param,
		showFooter:footer,
		frozenColumns:[
            frozen[modnya]
        ],
		columns:[
            kolom[modnya]
        ],
		//toolbar: tolbarnya,
		onBeforeEdit:function(index,row,rowIndex){
            row.editing = true;
            updateActions(divnya,index);
        },
        onAfterEdit:function(index,row){
            row.editing = false;
            updateActions(divnya,index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            updateActions(divnya,index);
        },
		onClickRow:function(rowIndex){
			index_row=rowIndex;
		}
	});	
}	

function updateActions(div,index){   
	$('#'+div).datagrid('updateRow',{
        index: index,
        row:{}
    });
}
function getRowIndex(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
function editrow(div,target){
    $('#'+div).datagrid('beginEdit', getRowIndex(target));
}
function deleterow(div,target){
    $.messager.confirm('Confirm','Are you sure?',function(r){
        if (r){
             $('#'+div).datagrid('deleteRow', getRowIndex(target));
        }
    });
}
function saverow(div,target,modul){
	var url = ""; 
	var divtotcost = ""; 
	var divtotpercent = ""; 
	var divtxtpercent = ""; 
	var arraynya = [
		'grid_assign_act_employee',
		'grid_expense_source_employee',
		'grid_assign_act_expense',
		'grid_assign_emp_expense',
		'grid_assign_assets_expense',
		'grid_assign_act_assets',
		'grid_assign_exp_assets',
		'grid_assign_act_costobject',
		'grid_assign_cust_costobject',
		'grid_assign_loc_costobject',
		'grid_assign_costobject_cust',
		'grid_assign_location_cust',
		'grid_assign_costobject_location',
		'grid_assign_cust_location',
		'tabel_employees',
		'tabel_expenses',
		'tabel_assets',
		'tabel_act',
		'tabel_act_to'
	];
	
	if(div == 'grid_assign_act_employee'){
		url = host+"homex/getcost/echo/cost/tbl_are/tbl_emp_id/"+$('#id_employee').val();
		divtotcost = "cost_activity_employee";
		divtotpercent = "total_percent_act_emp";
		divtxtpercent = "total_percent_act_emp_txt";
		
	}else if(div == 'grid_expense_source_employee'){
		url = host+"homex/getcost/echo/cost/tbl_efx/tbl_emp_id/"+$('#id_employee').val();
		divtotcost = "cost_expense_employee";
		divtotpercent = "total_percent_exp_emp";
		divtxtpercent = "total_percent_exp_emp_txt";
	
	}else if(div == 'grid_assign_act_expense'){
		url = host+"homex/getcost/echo/cost/tbl_are/tbl_exp_id/"+$('#id_expense').val();
		divtotcost = "cost_activity_expense";
		divtotpercent = "total_percent_act_exp";
		divtxtpercent = "total_percent_act_exp_txt";
	
	}else if(div == 'grid_assign_emp_expense'){
		url = host+"homex/getcost/echo/cost/tbl_efx/tbl_exp_id/"+$('#id_expense').val()+"/expense_emp/";
		divtotcost = "cost_employee_expense";
		divtotpercent = "total_percent_emp_exp";
		divtxtpercent = "total_percent_emp_exp_txt";
		
	}else if(div == 'grid_assign_assets_expense'){
		url = host+"homex/getcost/echo/cost/tbl_efx/tbl_exp_id/"+$('#id_expense').val()+"/expense_ass/";
		divtotcost = "cost_assets_expense";
		divtotpercent = "total_percent_ass_exp";
		divtxtpercent = "total_percent_ass_exp_txt";
		
	}else if(div == 'grid_assign_act_assets'){
		url = host+"homex/getcost/echo/cost/tbl_are/tbl_assets_id/"+$('#id_assets').val();
		divtotcost = "cost_activity_assets";
		divtotpercent = "total_percent_act_ass";
		divtxtpercent = "total_percent_act_ass_txt";
		
	}else if(div == 'grid_assign_exp_assets'){
		url = host+"homex/getcost/echo/cost/tbl_efx/tbl_assets_id/"+$('#id_assets').val()+"/expense_ass/";
		divtotcost = "cost_expense_assets";
		divtotpercent = "total_percent_exp_ass";
		divtxtpercent = "total_percent_exp_ass_txt";
		
	}else if(div == 'grid_assign_act_costobject'){
		url = host+"homex/getcost/echo/cost/tbl_prd/tbl_prm_id/"+$('#id_prm').val();
		divtotcost = "total_costdriver_costobject";
	
	}else if(div == 'grid_assign_cust_costobject'){
		url = host+"homex/getcost/echo/cost/tbl_ptp/tbl_prm_id/"+$('#id_prm').val()+"/customer_costobject/";
		divtotcost = "total_customer_costobject";
		
	}else if(div == 'grid_assign_loc_costobject'){
		url = host+"homex/getcost/echo/cost/tbl_ptp/tbl_prm_id/"+$('#id_prm').val()+"/location_costobject/";
		divtotcost = "total_location_costobject";
		
	}else if(div == 'grid_assign_costobject_cust'){
		url = host+"homex/getcost/echo/cost/tbl_ptp/tbl_cust_id/"+$('#id_cust').val()+"/costobject_customer/";
		divtotcost = "total_costobject_customer";
		
	}else if(div == 'grid_assign_location_cust'){
		url = host+"homex/getcost/echo/cost/tbl_ptp/tbl_cust_id/"+$('#id_cust').val()+"/location_customer/";
		divtotcost = "total_location_customer";
		
	}else if(div == 'grid_assign_costobject_location'){
		url = host+"homex/getcost/echo/cost/tbl_ptp/tbl_location_id/"+$('#id_location').val()+"/costobject_location/";
		divtotcost = "total_costobject_location";
		
	}else if(div == 'grid_assign_cust_location'){
		url = host+"homex/getcost/echo/cost/tbl_ptp/tbl_location_id/"+$('#id_location').val()+"/customer_location/";
		divtotcost = "total_customer_location";
		
	}
	// Activity
	
	else if(div == 'tabel_employees'){
		url = host+"home/getcost/emp/"+id_act+"/"+$('#bulan_main').val()+"/"+$('#tahun_main').val();
		divtotcost = "total_cost_from_employees";
		//divtotpercent = "cost_form_employees";
		divtxtpercent = "total_persen_from_employees";
		
	}
	else if(div == 'tabel_expenses'){
		url = host+"home/getcost/exp/"+id_act+"/"+$('#bulan_main').val()+"/"+$('#tahun_main').val();
		divtotcost = "total_cost_from_expanses";
		//divtotpercent = "cost_form_employees";
		divtxtpercent = "total_persen_from_expanses";
		
	}
	else if(div == 'tabel_assets'){
		url = host+"home/getcost/assets/"+id_act+"/"+$('#bulan_main').val()+"/"+$('#tahun_main').val();
		divtotcost = "total_cost_from_assets";
		//divtotpercent = "cost_form_employees";
		divtxtpercent = "total_persen_from_assets";
		
	}
	else if(div == 'tabel_act'){
		url = host+"home/getcost/f_act/"+id_act+"/"+$('#bulan_main').val()+"/"+$('#tahun_main').val();
		divtotcost = "total_cost_from_activity";
		//divtotpercent = "cost_form_employees";
		divtxtpercent = "total_persen_from_activity";
		
	}
	else if(div == 'tabel_act_to'){
		url = host+"home/getcost/t_act/"+id_act+"/"+$('#bulan_main').val()+"/"+$('#tahun_main').val();
		divtotcost = "total_cost_to_activity";
		//divtotpercent = "cost_form_employees";
		divtxtpercent = "total_persen_to_activity";
		
	}
	
	if(div == 'grid_assign_act_costobject' || div == 'grid_assign_cust_costobject' || div == 'grid_assign_loc_costobject' || div == 'grid_assign_costobject_cust' || div == 'grid_assign_location_cust' || div == 'grid_assign_costobject_location' || div == 'grid_assign_cust_location' ){
		if($('#'+div).datagrid('endEdit', getRowIndex(target))){
			$('#'+div).datagrid('reload');
			if( $.inArray(div, arraynya) > -1 ){
				get_total_cost(url,divtotcost,divtotpercent,divtxtpercent)
			}
		}else{
			return false;
		}
	}else{
		var actionss = validasi_proportion(div,target,divtxtpercent);
		console.log(actionss);
		if(actionss == 1){
			if( $.inArray(div, arraynya) > -1 ){
				get_total_cost(url,divtotcost,divtotpercent,divtxtpercent)
			}
		}else{
			return false;
		}
	}
	
	/*
	if(typeof(modul) == "undefined"){
		//action = ;
		if($('#'+div).datagrid('endEdit', getRowIndex(target))){
			$('#'+div).datagrid('reload');
			if( $.inArray(div, arraynya) > -1 ){
				get_total_cost(url,divtotcost,divtotpercent,divtxtpercent)
			}
		}else{
			return false;
		}
	}else{
		var actionss = validasi_proportion(div,target,divtxtpercent);
		console.log(actionss);
		if(actionss == 1){
			if( $.inArray(div, arraynya) > -1 ){
				get_total_cost(url,divtotcost,divtotpercent,divtxtpercent)
			}
		}else{
			return false;
		}
	}
	*/
}


function genform(type, modulnya, submodulnya, stswindow, tabel){
	var urlpost = host+'backend/get_form/'+submodulnya+'/form';
	var urlimport = "";
	var id_tambahan = "";
	lebar = 850;
	tinggi = 350;

	switch(submodulnya){
		//Modul Master Data
		case "phase":
			table = "tbl_master_phase";
			judulwindow = 'Form Master Phase';
			lebar = 600;
			tinggi = 400;
			urlpost = host+'backend/getdisplay/master/form-'+submodulnya;
		break;
		case "potype":
			table = "tbl_master_potype";
			judulwindow = 'Form Master PO Type';
			lebar = 600;
			tinggi = 200;
			urlpost = host+'backend/getdisplay/master/form-'+submodulnya;
		break;
		case "pocurrency":
			table = "tbl_master_pocurrency";
			judulwindow = 'Form Master Currency';
			lebar = 600;
			tinggi = 200;
			urlpost = host+'backend/getdisplay/master/form-'+submodulnya;
		break;
		case "region":
			table = "tbl_master_region";
			judulwindow = 'Form Master Region';
			lebar = 600;
			tinggi = 200;
			urlpost = host+'backend/getdisplay/master/form-'+submodulnya;
		break;
		case "sitename":
			table = "tbl_master_sitename";
			judulwindow = 'Form Master Site Status';
			lebar = 600;
			tinggi = 200;
			urlpost = host+'backend/getdisplay/master/form-'+submodulnya;
		break;
		case "pone":
			table = "tbl_master_pone";
			judulwindow = 'Form Master NE Name';
			lebar = 600;
			tinggi = 200;
			urlpost = host+'backend/getdisplay/master/form-'+submodulnya;
		break;
		//End Modul Master Data
		
		//Modul Master Progress
		case "masterpo":
			table = "tbl_master_po";
			judulwindow = 'Form Master PO';
			lebar = 700;
			tinggi = 600;
			urlpost = host+'backend/getdisplay/progress/form-'+submodulnya;
			
			urlimport = host+'backend/getdisplay/progress/import-'+submodulnya;
			lebar_import = 700;
			tinggi_import = 600;
			type_import = "masterpo";
		break;
		case "mastercr":
			table = "tbl_master_cr";
			judulwindow = 'Form Master CR';
			lebar = 700;
			tinggi = 600;
			urlpost = host+'backend/getdisplay/progress/form-'+submodulnya;
			
			urlimport = host+'backend/getdisplay/progress/import-'+submodulnya;
			lebar_import = 700;
			tinggi_import = 600;
			type_import = "mastercr";
		break;
		case "mastercr":
			table = "tbl_master_cr";
			judulwindow = 'Form Master CR';
			lebar = 700;
			tinggi = 600;
			urlpost = host+'backend/getdisplay/progress/form-'+submodulnya;
			
			urlimport = host+'backend/getdisplay/progress/import-'+submodulnya;
			lebar_import = 700;
			tinggi_import = 600;
			type_import = "mastercr";
		break;
		case "uploadtracker":			
			urlimport = host+'backend/getdisplay/progress/import-'+submodulnya;
			lebar_import = 700;
			tinggi_import = 600;
			type_import = "uploadtracker";
		break;
		case "siteinfo":			
			table = "tbl_master_tracker_siteinfo";
			judulwindow = 'Form Site Info';
			lebar = 700;
			tinggi = 200;
			urlpost = host+'backend/getdisplay/master/form-'+submodulnya;
		break;
		//End Modul Master Progress

		//Start Modul PO All Database
		case "uploadalldatabase":			
			urlimport = host+'backend/getdisplay/database/import-'+submodulnya;
			lebar_import = 700;
			tinggi_import = 600;
			type_import = "uploadalldatabase";
		break;
		//End Modul PO All Database
		
		//Modul User Management
		case "userlist":
			table = "tbl_user";
			judulwindow = 'Form User List';
			lebar = 600;
			tinggi = 420;
			urlpost = host+'backend/getdisplay/usermanagement/form-'+submodulnya;
		break;
		case "grouplist":
			table = "tbl_user_group";
			judulwindow = 'Form Group List';
			lebar = 600;
			tinggi = 200;
			urlpost = host+'backend/getdisplay/usermanagement/form-'+submodulnya;
		break;
		//End Modul User Management
	}
	
	switch(type){
		case "import_data":
			$.post(urlimport, { 'type_import':type_import }, function(resp){
				if(stswindow == undefined){
					$('#grid_nya_'+submodulnya).hide();
					$('#frm_'+submodulnya).show().addClass("loading");	
				}

				if(stswindow == 'windowform'){
					windowForm(resp, "Form Import Data", lebar_import, tinggi_import);
				}else if(stswindow == 'windowpanel'){
					windowFormPanel(resp, "Form Import Data", lebar_import, tinggi_import);
				}else{
					$('#frm_'+submodulnya).show();
					$('#frm_'+submodulnya).html(resp).removeClass("loading");
				}
			});
		break;
		case "add":
			$.post(urlpost, {'editstatus':'add', 'ts':table, 'id_tambahan':id_tambahan }, function(resp){
				if(stswindow == undefined){
					$('#grid_nya_'+submodulnya).hide();
					$('#frm_'+submodulnya).show().addClass("loading");	
				}

				if(stswindow == 'windowform'){
					windowForm(resp, judulwindow, lebar, tinggi);
				}else if(stswindow == 'windowpanel'){
					windowFormPanel(resp, judulwindow, lebar, tinggi);
				}else{
					$('#frm_'+submodulnya).show();
					$('#frm_'+submodulnya).html(resp).removeClass("loading");
				}
			});
		break;
		case "edit":
		case "inactive":
		case "active":
		
			var row = $("#grid_"+submodulnya).datagrid('getSelected');
			if(row){
				if(type=='edit'){
					if(stswindow == undefined){
						$('#grid_nya_'+submodulnya).hide();
						$('#frm_'+submodulnya).show().addClass("loading");	
					}
					$.post(urlpost, { 'editstatus':'edit', id:row.id, 'ts':table, 'submodul':submodulnya, 'bulan':row.bulan, 'tahun':row.tahun, 'id_tambahan':id_tambahan }, function(resp){
						if(stswindow == 'windowform'){
							windowForm(resp, judulwindow, lebar, tinggi);
						}else if(stswindow == 'windowpanel'){
							windowFormPanel(resp, judulwindow, lebar, tinggi);
						}else{
							$('#frm_'+submodulnya).show();
							$('#frm_'+submodulnya).html(resp).removeClass("loading");
						}
					});
				}else if(type=='inactive'){
					urldelete = host+'backend/simpandata/'+table;
					$.messager.confirm('POIN v.2','Are You Sure Set Inactive This Data ?',function(re){
						if(re){
							loadingna();
							$.post(urldelete, {id:row.id, 'editstatus':'inactive'}, function(r){
								if(r==1){
									winLoadingClose();
									$.messager.alert('POIN v.2',"Data Inactive",'info');
									$('#grid_'+submodulnya).datagrid('reload');								
								}else{
									winLoadingClose();
									console.log(r)
									$.messager.alert('POIN v.2',"Failed Set Inactive Data",'error');
								}
							});	
						}
					});	
				}else if(type=='active'){
					urldelete = host+'backend/simpandata/'+table;
					$.messager.confirm('POIN v.2','Are You Sure Activated Again This Data ?',function(re){
						if(re){
							loadingna();
							$.post(urldelete, {id:row.id, 'editstatus':'activate'}, function(r){
								if(r==1){
									winLoadingClose();
									$.messager.alert('POIN v.2',"Data Activated Again",'info');
									$('#grid_'+submodulnya).datagrid('reload');								
								}else{
									winLoadingClose();
									console.log(r)
									$.messager.alert('POIN v.2',"Failed Activated Data",'error');
								}
							});	
						}
					});	
				}
				
			}
			else{
				$.messager.alert('POIN v.2',"Select Row In Grid",'error');
			}
		break;
		
	}
}

function genTab(div, mod, sub_mod, tab_array, div_panel, judul_panel, mod_num, height_panel, height_tab, width_panel, width_tab){
	var id_sub_mod=sub_mod.split("_");
	if(typeof(div_panel)!= "undefined" || div_panel!=""){
		$(div_panel).panel({
			width:(typeof(width_panel) == "undefined" ? getClientWidth()-268 : width_panel),
			height:(typeof(height_panel) == "undefined" ? getClientHeight()-100 : height_panel),
			title:judul_panel,
			//fit:true,
			tools:[{
					iconCls:'icon-cancel',
					handler:function(){
						$('#grid_nya_'+id_sub_mod[1]).show();
						$('#detil_nya_'+id_sub_mod[1]).hide();
						$('#grid_'+id_sub_mod[1]).datagrid('reload');
					}
			}]
		}); 
	}
	
	$(div).tabs({
		title:'AA',
		height: (typeof(height_tab) == "undefined" ? getClientHeight()-190 : height_tab),
		width: (typeof(width_tab) == "undefined" ? getClientWidth()-280 : width_tab),
		plain: false,
		fit:true,
		onSelect: function(title){
				var isi_tab=title.replace(/ /g,"_");
				var par={};
				console.log(isi_tab);
				$('#'+isi_tab.toLowerCase()).html('').addClass('loading');
				urlnya = host+'index.php/content-tab/'+mod+'/'+isi_tab.toLowerCase();
				$(div_panel).panel({title:title});
				
				switch(mod){
					case "kasir":
						var lantainya = title.split(" ");
						var lantainya = lantainya.length-1;
						
						par['posisi_lantai'] = lantainya;
						urlnya = host+'kasir-lantai/';
					break;
					case "pengaturan":
						
					break;
				}
				$.post(urlnya,par,function(r){
					$('#'+isi_tab.toLowerCase()).removeClass('loading').html(r);
				});
		},
		selected:0
	});
	
	if(tab_array.length > 0){
		for(var x in tab_array){
			var isi_tab=tab_array[x].replace(/ /g,"_");
			$(div).tabs('add',{
				title:tab_array[x],
				content:'<div style="padding: 5px;"><div id="'+isi_tab.toLowerCase()+'" style="height: 200px;">'+isi_tab.toLowerCase()+'zzzz</div></div>'
			});
		}
		var tab = $(div).tabs('select',0);
	}
}

function kumpulAction(type, p1, p2, p3, p4, p5){
	var param = {};
	switch(type){
		case "reservation":
			grid = $('#grid_reservasi').datagrid('getSelected');
			$.post(host+'backend/simpan_data/tbl_reservasi_confirm', { 'id':grid.id, 'confirm':p1 }, function(rsp){
				if(rsp == 1){
					$.messager.alert('Roger Salon',"Confirm OK",'info');
				}else{
					$.messager.alert('Roger Salon',"Failed Confirm",'error');
				}
				$('#grid_reservasi').datagrid('reload');	
			} );
		break;
		case "userrole":
			$.post(host+'backend/getdisplay/usermanagement/form_user_role', {'id':p1, 'editstatus':'add'}, function(resp){
				var lebar = getClientWidth()-500;
				var tinggi = getClientHeight()-180;
				windowForm(resp, "User Group Role Privilleges - "+p2, lebar, tinggi);
			});
		break;		
	}
}	

function submit_form(frm,func){
	var url = jQuery('#'+frm).attr("url");
    jQuery('#'+frm).form('submit',{
            url:url,
            onSubmit: function(){
                  return $(this).form('validate');
            },
            success:function(data){
				//$.unblockUI();
                if (func == undefined ){
                     if (data == "1"){
                        pesan('Data Sudah Disimpan ','Sukses');
                    }else{
                         pesan(data,'Result');
                    }
                }else{
                    func(data);
                }
            },
            error:function(data){
				//$.unblockUI();
                 if (func == undefined ){
                     pesan(data,'Error');
                }else{
                    func(data);
                }
            }
    });
}

function fillCombo(url, SelID, value, value2, value3, value4){
	//if(Ext.get(SelID).innerHTML == "") return false;
	if (value == undefined) value = "";
	if (value2 == undefined) value2 = "";
	if (value3 == undefined) value3 = "";
	if (value4 == undefined) value4 = "";
	
	$('#'+SelID).empty();
	$.post(url, {"v": value, "v2": value2, "v3": value3, "v4": value4},function(data){
		$('#'+SelID).append(data);
	});

}

function formatDate(date) {
	var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function parserDate(s){
	if (!s) return new Date();
    var ss = s.split('-');
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d)
    } else {
        return new Date();
    }
}


function clear_form(id){
	$('#'+id).find("input[type=text], textarea,select").val("");
	//$('.angka').numberbox('setValue',0);
}

var divcontainerz;
function windowLoading(html,judul,width,height){
    divcontainerz = "win"+Math.floor(Math.random()*9999);
    $("<div id="+divcontainerz+"></div>").appendTo("body");
    divcontainerz = "#"+divcontainerz;
    $(divcontainerz).html(html);
    $(divcontainerz).css('padding','5px');
    $(divcontainerz).window({
       title:judul,
       width:width,
       height:height,
       autoOpen:false,
       modal:true,
       maximizable:false,
       resizable:false,
       minimizable:false,
       closable:false,
       collapsible:false,  
    });
    $(divcontainerz).window('open');        
}
function winLoadingClose(){
    $(divcontainerz).window('close');
    //$(divcontainer).html('');
}
function loadingna(){
	windowLoading("<img src='"+host+"__assets/img/loading.gif' style='position: fixed;top: 50%;left: 50%;margin-top: -10px;margin-left: -25px;'/>","Please Wait",200,100);
}

function NumberFormat(value) {
	
    var jml= new String(value);
    if(jml=="null" || jml=="NaN") jml ="0";
    jml1 = jml.split("."); 
    jml2 = jml1[0];
    amount = jml2.split("").reverse();

    var output = "";
    for ( var i = 0; i <= amount.length-1; i++ ){
        output = amount[i] + output;
        if ((i+1) % 3 == 0 && (amount.length-1) !== i)output = '.' + output;
    }
    //if(jml1[1]===undefined) jml1[1] ="00";
   // if(isNaN(output))  output = "0";
    return output; // + "." + jml1[1];
}

function showErrorAlert (reason, detail) {
		var msg='';
		if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
		else {
			console.log("error uploading file", reason, detail);
		}
		$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
		 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
	}
function konversi_pwd_text(id){
	if($('input#'+id)[0].type=="password")$('input#'+id)[0].type = 'text';
	else $('input#'+id)[0].type = 'password';
}
function gen_editor(id){
	tinymce.init({
		  selector: id,
		  height: 200,
		  plugins: [
				"advlist autolink lists link image charmap print preview anchor",
				"searchreplace visualblocks code fullscreen",
				"insertdatetime media table contextmenu paste jbimages"
		    ],
			
		  // ===========================================
		  // PUT PLUGIN'S BUTTON on the toolbar
		  // ===========================================
		  menubar: true,
		  toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ",
			
		  // ===========================================
		  // SET RELATIVE_URLS to FALSE (This is required for images to display properly)
		  // ===========================================
			
		  relative_urls: false
		});
		
		tinyMCE.execCommand('mceRemoveControl', true, id);
		tinyMCE.execCommand('mceAddControl', true, id);
	
}

function openWindowWithPost(url,params){
    var newWindow = window.open(url, 'winpost'); 
    if (!newWindow) return false;
    var html = "";
    html += "<html><head></head><body><form  id='formid' method='post' action='" + url + "'>";

    $.each(params, function(key, value) { 
            
                if (value instanceof Array || value instanceof Object) {
                    $.each(value, function(key1, value1) { 
                        html += "<input type='hidden' name='" + key + "["+key1+"]' value='" + value1 + "'/>";
                    });
                }else{
                    html += "<input type='hidden' name='" + key + "' value='" + value + "'/>";
                }
        });
   
    html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</script></body></html>";
    newWindow.document.write(html);
    return newWindow;
}


