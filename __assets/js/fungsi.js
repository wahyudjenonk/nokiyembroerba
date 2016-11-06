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
	var pagesizeboy = 10;
	var singleSelek = true;
	var nowrap_nya = false;
	var footer=false;
	
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
				{field:'publish',title:'Publish',width:50, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
				{field:'status',title:'Status',width:50, halign:'center',align:'left',
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
		case "pocurrency":
			judulnya = "";
			urlnya = "pocurrency";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'currency',title:'Currency',width:150, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
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
		case "region":
			judulnya = "";
			urlnya = "region";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'region_code',title:'Region Code',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
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
		case "pone":
			judulnya = "";
			urlnya = "pone";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'po_ne',title:'NE Name',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
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
		case "sitename":
			judulnya = "";
			urlnya = "sitename";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'site_status',title:'Site Status',width:100, halign:'center',align:'left', sortable:true},
			]
			kolom[modnya] = [	
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true, resizable: true},
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
				{field:'file_name',title:'File Name',width:200, halign:'center',align:'left', sortable:true},
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
				{field:'file_name',title:'File Name',width:200, halign:'center',align:'left', sortable:true},
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
		case "uploadtracker":
			judulnya = "";
			urlnya = "uploadtracker";
			//height = 800;
			fitnya = true;
			urlglobal = host+'backend/getdata/'+urlnya;
			frozen[modnya] = [	
				{field:'filename',title:'File Name',width:250, halign:'center',align:'left', sortable:true},
				
			]
			kolom[modnya] = [
				{field:'type_tracker',title:'Type Upload',width:250, halign:'center',align:'left', sortable:true},
				{field:'type_upload',title:'New / Update',width:100, halign:'center',align:'left', sortable:true},
				{field:'remark',title:'Remark',width:200, halign:'center',align:'left', sortable:true},
				{field:'update_by',title:'Update By',width:100, halign:'center',align:'left', sortable:true},
				{field:'update_date',title:'Update Date',width:120, halign:'center',align:'center', sortable:true},
			]
		break;
		
	}
	
	grid_nya=$("#"+divnya).datagrid({
		title:judulnya,
		width: '100%',
		height: '100%',
		rownumbers:false,
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
		pageList:[10,20,30,40,50,75,100,200],
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
						$.post(host+'trx-penjualan', {'editstatus':'add', 'cl_meja_id':par1, 'tbl_produk_id':rowData.id}, function(resp){
							if(resp == 1){
								$('#grid_list_pesanan_kasir').datagrid('reload');
								$('.info-empty').remove();
								$.post(host+'total-pesanan', { 'id_meja':par1 }, function(resp){
									var parsing = $.parseJSON(resp);
									$('#total_qty').val(parsing.tot_qty);
									$('#total_hrg').val(NumberFormat(parsing.tot_harga));
								});
							}else{
								$.messager.alert('Error','Error System','error');
							}
						});
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
			judulwindow = 'Form Master NE Name';
			lebar = 600;
			tinggi = 200;
			urlpost = host+'backend/getdisplay/master/form-'+submodulnya;
		break;
		case "pone":
			table = "tbl_master_pone";
			judulwindow = 'Form Master Site Status';
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
		//End Modul Master Progress
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


