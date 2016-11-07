<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');}class Mbackend extends CI_Model{	function __construct(){		parent::__construct();		//$this->auth = unserialize(base64_decode($this->session->userdata('n0k111a')));	}		function getdata($type="", $balikan="", $p1="", $p2="",$p3="",$p4=""){		$where = " WHERE 1=1 ";		if($this->input->post('kat')){			if($this->input->post('kat') == 'all'){				$table = $this->input->post('table');				$field = $this->db->list_fields($table);				$where .= " AND ( ";				foreach($field as $k => $v){					if($v == 'update_by' || $v == 'update_date'){						continue;					}					if ($k == reset($field)){						$where .= " A.".$v." like '%".$this->db->escape_str($this->input->post('key'))."%' ";					}elseif ($k == end($field)){						$where .= " A.".$v." like '%".$this->db->escape_str($this->input->post('key'))."%' ";					}else{						$where .= "OR A.".$v." like '%".$this->db->escape_str($this->input->post('key'))."%' ";					}				}				$where .= " ) ";			}else{				$where .=" AND A.".$this->input->post('kat')." like '%".$this->db->escape_str($this->input->post('key'))."%'";			}		}				switch($type){			case "data_login":				$sql = "					SELECT *					FROM tbl_user 					WHERE nama_user = '".$p1."'				";			break;			case "phase": 				$sql = "					SELECT A.*					FROM tbl_master_phase A					$where 				";							break;			case "potype": 				$sql = "					SELECT A.*					FROM tbl_master_potype A					$where				";			break;			case "pocurrency": 				$sql = "					SELECT A.*					FROM tbl_master_pocurrency A					$where				";			break;			case "region": 				$sql = "					SELECT A.*					FROM tbl_master_region A					$where				";			break;			case "sitename": 				$sql = "					SELECT A.*					FROM tbl_master_sitename A					$where				";			break;			case "pone": 				$sql = "					SELECT A.*					FROM tbl_master_pone A					$where				";			break;			case "masterpo": 				$sql = "					SELECT A.*, B.phase_code, B.phase_name, B.phase_year,						D.currency, C.po_type					FROM tbl_master_po A					LEFT JOIN tbl_master_phase B ON B.id = A.tbl_master_phase_id					LEFT JOIN tbl_master_potype C ON C.id = A.tbl_master_potype_id					LEFT JOIN tbl_master_pocurrency D ON D.id = A.tbl_master_currency_id					$where				";			break;			case "mastercr": 				$sql = "					SELECT A.*, B.phase_code, B.phase_name, B.phase_year					FROM tbl_master_cr A					LEFT JOIN tbl_master_phase B ON B.id = A.tbl_master_phase_id					$where				";			break;			case "uploadtracker":				$sql = "					SELECT A.*					FROM tbl_uploader_tracker A				";			break;			case "siteinfo":				$sql = "					SELECT A.*, B.phase_code, B.phase_name,						C.site_status, D.region_code, E.po_ne					FROM tbl_master_tracker_siteinfo A					LEFT JOIN tbl_master_phase B ON B.id = A.tbl_master_phase_id					LEFT JOIN tbl_master_sitename C ON C.id = A.tbl_master_sitename_id					LEFT JOIN tbl_master_region D ON D.id = A.tbl_master_region_id					LEFT JOIN tbl_master_pone E ON D.id = A.tbl_master_pone_id					$where				";			break;		}				if($balikan == 'json'){			return $this->lib->json_grid($sql);		}elseif($balikan == 'row_array'){			return $this->db->query($sql)->row_array();		}elseif($balikan == 'result'){			return $this->db->query($sql)->result();		}elseif($balikan == 'result_array'){			return $this->db->query($sql)->result_array();		}			}		function get_combo($type="", $p1="", $p2=""){		switch($type){			case "tbl_master_phase":				$sql = "					SELECT A.id, CONCAT_WS('-', A.phase_code, A.phase_year) as txt					FROM $type A					WHERE A.status = '1'				";			break;			case "tbl_master_potype":				$sql = "					SELECT A.id, A.po_type as txt					FROM $type A					WHERE A.status = '1'				";			break;			case "tbl_master_pocurrency":				$sql = "					SELECT A.id, A.currency as txt					FROM $type A					WHERE A.status = '1'				";			break;		}				return $this->db->query($sql)->result_array();	}		function simpandata($table,$data,$sts_crud){ //$sts_crud --> STATUS NYEE INSERT, UPDATE, DELETE		$this->db->trans_begin();		if(isset($data['id'])){			$id = $data['id'];			unset($data['id']);		}				$data['update_by'] = $this->auth['nama_user']; 		$data['update_date'] = date('Y-m-d H:i:s'); 				switch($table){			case "tbl_master_phase":						break;			case "tbl_master_potype":							break;			case "tbl_master_pocurrency":							break;			case "tbl_master_region":							break;			case "tbl_master_sitename":							break;			case "tbl_master_pone":							break;			case "tbl_master_po":							break;			case "tbl_master_cr":							break;			case "tbl_uploader_tracker":							break;			case "tbl_master_tracker_siteinfo":							break;		}				switch ($sts_crud){			case "add": 				$data['status'] = 1;				$this->db->insert($table,$data);			break;			case "edit":				$this->db->update($table, $data, array('id' => $id) );			break;			case "inactive":				$data['status'] = 0;				$this->db->update($table, $data, array('id' => $id) );			break;			case "activate":				$data['status'] = 1;				$this->db->update($table, $data, array('id' => $id) );			break;		}				if($this->db->trans_status() == false){			$this->db->trans_rollback();			return 'gagal';		}else{			 return $this->db->trans_commit();		}	}		function importdata($type=""){		$this->load->library("PHPExcel");		if(!empty($_FILES['file_import']['name'])){			//$this->db->trans_begin();						$ext = explode('.',$_FILES['file_import']['name']);			$exttemp = sizeof($ext) - 1;			$extension = $ext[$exttemp];						$upload_path = "./__repository/tmp_upload/";			$filen = $ext[0]."-".date('Ymd_His').".".$extension;			$filename =  $this->lib->uploadnong($upload_path, 'file_import', $filen);						$folder_aplod = $upload_path.$filename;			$cacheMethod   = PHPExcel_CachedObjectStorageFactory::cache_to_phpTemp;			$cacheSettings = array('memoryCacheSize' => '1600MB');			PHPExcel_Settings::setCacheStorageMethod($cacheMethod,$cacheSettings);			if($extension=='xls'){				$lib="Excel5";			}else{				$lib="Excel2007";			}						$objReader =  PHPExcel_IOFactory::createReader($lib);//excel2007			ini_set('max_execution_time', 123456);			//end set						$objPHPExcel = $objReader->load($folder_aplod); 			$objReader->setReadDataOnly(true);			$nama_sheet=$objPHPExcel->getSheetNames();			$worksheet = $objPHPExcel->setActiveSheetIndex(0);			$array_benar = array();			$array_salah = array();			$method = $this->input->post('methodupload');									switch($type){				case "masterpo":					for($i=6; $i <= $worksheet->getHighestRow(); $i++){						$statusdata = true;						$arrayphasesalah = array();						$arraypotypesalah = array();						$arraycurrencysalah = array();						if($worksheet->getCell("B".$i)->getCalculatedValue() != ""){							$arrayphase = array(								'phase_code' => $worksheet->getCell("B".$i)->getCalculatedValue(),							);							$cekphase = $this->db->get_where('tbl_master_phase', $arrayphase)->row_array();							if(isset($cekphase)){								$tbl_master_phase_id = $cekphase['id'];							}else{								$statusdata = false;								$arrayphasesalah['phase_code'] = $worksheet->getCell("B".$i)->getCalculatedValue();								$arrayphasesalah['phase_name'] = $worksheet->getCell("D".$i)->getCalculatedValue();								$arrayphasesalah['phase_year'] = $worksheet->getCell("C".$i)->getCalculatedValue();							}						}						if($worksheet->getCell("E".$i)->getCalculatedValue() != ""){							$arraypotype = array(								'po_type' => $worksheet->getCell("E".$i)->getCalculatedValue(),							);							$cekpotype = $this->db->get_where('tbl_master_potype', $arraypotype)->row_array();							if(isset($cekpotype)){								$tbl_master_potype_id = $cekpotype['id'];							}else{								$statusdata = false;								$arraypotypesalah['po_type'] = $worksheet->getCell("E".$i)->getCalculatedValue();							}						}						if($worksheet->getCell("H".$i)->getCalculatedValue() != ""){							$arraycurrency = array(								'currency' => $worksheet->getCell("H".$i)->getCalculatedValue(),							);							$cekcurrency = $this->db->get_where('tbl_master_pocurrency', $arraycurrency)->row_array();							if(isset($cekcurrency)){								$tbl_master_currency_id = $cekcurrency['id'];							}else{								$statusdata = false;								$arraycurrencysalah['currency'] = $worksheet->getCell("H".$i)->getCalculatedValue();							}						}												if($statusdata == true){														$podatet = $worksheet->getCell("J".$i)->getCalculatedValue();							$podatet = new DateTime("1899-12-30 + $podatet days");							$podate = $podatet->format('Y-m-d');														$poreceivedt = $worksheet->getCell("K".$i)->getCalculatedValue();							$poreceivedt = new DateTime("1899-12-30 + $poreceivedt days");							$poreceived = $poreceivedt->format('Y-m-d');														$podeliveryt = $worksheet->getCell("L".$i)->getCalculatedValue();							$podeliveryt = new DateTime("1899-12-30 + $podeliveryt days");							$podelivery = $podeliveryt->format('Y-m-d');									$arrayinsertbenar = array(								'tbl_master_phase_id' => $tbl_master_phase_id,								'tbl_master_potype_id' => $tbl_master_potype_id,								'tbl_master_currency_id' => $tbl_master_currency_id,								'po_no' => $worksheet->getCell("F".$i)->getCalculatedValue(),								'project_name' => $worksheet->getCell("G".$i)->getCalculatedValue(),								'basic_contract' => $worksheet->getCell("I".$i)->getCalculatedValue(),								'po_date' => $podate,								'po_received' => $poreceived,								'po_delivery' => $podelivery,								'revision_no' => $worksheet->getCell("M".$i)->getCalculatedValue(),								'po_gross_idr' => $worksheet->getCell("N".$i)->getCalculatedValue(),								'po_nett_idr' => $worksheet->getCell("O".$i)->getCalculatedValue(),								'jis_dorr_rate' => $worksheet->getCell("P".$i)->getCalculatedValue(),								'po_gross_usd' => ($worksheet->getCell("N".$i)->getCalculatedValue() / $worksheet->getCell("P".$i)->getCalculatedValue()),								'po_nett_usd' => ($worksheet->getCell("O".$i)->getCalculatedValue() / $worksheet->getCell("P".$i)->getCalculatedValue()),								//'po_nett_usd' => $worksheet->getCell("R".$i)->getCalculatedValue(),								'remarks' => $worksheet->getCell("S".$i)->getCalculatedValue(),								'file_name' => $filen,								'update_by' => $this->auth['nama_user'],								'update_date' => date('Y-m-d H:i:s'),								'status' => 1							);														if($method == 'N'){								array_push($array_benar, $arrayinsertbenar);							}elseif($method == 'U'){								$id = $worksheet->getCell("A".$i)->getCalculatedValue();								if($id){									$this->db->update('tbl_master_po', $arrayinsertbenar, array('id'=>$id) );								}							}						}else{							$arrayinsertsalah = array(								'row' => $i,								'phase' => $arrayphasesalah,								'potype' => $arraypotypesalah,								'currency' => $arraycurrencysalah							);							array_push($array_salah, $arrayinsertsalah);						}					}					$table = "tbl_master_po";									break;				case "mastercr":					for($i=6; $i <= $worksheet->getHighestRow(); $i++){						$statusdata = true;						$arrayphasesalah = array();						if($worksheet->getCell("E".$i)->getCalculatedValue() != ""){							$arrayphase = array(								'phase_code' => $worksheet->getCell("E".$i)->getCalculatedValue(),							);							$cekphase = $this->db->get_where('tbl_master_phase', $arrayphase)->row_array();							if(isset($cekphase)){								$tbl_master_phase_id = $cekphase['id'];							}else{								$statusdata = false;								$arrayphasesalah['phase_code'] = $worksheet->getCell("E".$i)->getCalculatedValue();								$arrayphasesalah['phase_name'] = $worksheet->getCell("F".$i)->getCalculatedValue();								$arrayphasesalah['phase_year'] = $worksheet->getCell("G".$i)->getCalculatedValue();							}						}												if($statusdata == true){							//$crsubmit 	= date_format(date_create_from_format('m/d/Y', $worksheet->getCell("K".$i)->getCalculatedValue()), 'Y-m-d');							//$crapproved = date_format(date_create_from_format('m/d/Y', $worksheet->getCell("L".$i)->getCalculatedValue()), 'Y-m-d');							//$poreceived = date_format(date_create_from_format('m/d/Y', $worksheet->getCell("M".$i)->getCalculatedValue()), 'Y-m-d');														$crsubmitt = $worksheet->getCell("K".$i)->getCalculatedValue();							$crsubmitt = new DateTime("1899-12-30 + $crsubmitt days");							$crsubmit = $crsubmitt->format('Y-m-d');														$crapprovedt = $worksheet->getCell("L".$i)->getCalculatedValue();							$crapprovedt = new DateTime("1899-12-30 + $crapprovedt days");							$crapproved = $crapprovedt->format('Y-m-d');														$poreceivedt = $worksheet->getCell("M".$i)->getCalculatedValue();							$poreceivedt = new DateTime("1899-12-30 + $poreceivedt days");							$poreceived = $poreceivedt->format('Y-m-d');														$arrayinsertbenar = array(								'tbl_master_phase_id' => $tbl_master_phase_id,								'cr_no_nokia' => $worksheet->getCell("B".$i)->getCalculatedValue(),								'cr_no_indosat' => $worksheet->getCell("C".$i)->getCalculatedValue(),								'cr_status' => $worksheet->getCell("D".$i)->getCalculatedValue(),								'nodin' => $worksheet->getCell("H".$i)->getCalculatedValue(),								'cr_position' => $worksheet->getCell("I".$i)->getCalculatedValue(),								'cr_pic' => $worksheet->getCell("J".$i)->getCalculatedValue(),								'cr_submit' => $crsubmit,								'cr_approved' => $crapproved,								'po_received' => $poreceived,								'value_before' => $worksheet->getCell("N".$i)->getCalculatedValue(),									'value_after' => $worksheet->getCell("O".$i)->getCalculatedValue(),								'value_delta' => ($worksheet->getCell("N".$i)->getCalculatedValue() - $worksheet->getCell("O".$i)->getCalculatedValue()),								'cr_type' => $worksheet->getCell("Q".$i)->getCalculatedValue(),								'remarks' => $worksheet->getCell("R".$i)->getCalculatedValue(),								'file_name' => $filen,								'update_by' => $this->auth['nama_user'],								'update_date' => date('Y-m-d H:i:s'),								'status' => 1							);														if($method == 'N'){								array_push($array_benar, $arrayinsertbenar);							}elseif($method == 'U'){								$id = $worksheet->getCell("A".$i)->getCalculatedValue();								if($id){									$this->db->update('tbl_master_cr', $arrayinsertbenar, array('id'=>$id) );								}							}						}else{							$arrayinsertsalah = array(								'row' => $i,								'phase' => $arrayphasesalah							);							array_push($array_salah, $arrayinsertsalah);						}					}					$table = "tbl_master_cr";									break;				case "siteinfo":					$boquery = true;					$boqaseli = 1;					$arrayboq = array();					for($i=6; $i <= $worksheet->getHighestRow(); $i++){						$statusdata = true;						$arrayphasesalah = array();						$arrayregionsalah = array();						$arraysitestatussalah = array();						$arrayponesalah = array();						if($worksheet->getCell("J".$i)->getCalculatedValue() != ""){							$arrayphase = array(								'phase_code' => $worksheet->getCell("J".$i)->getCalculatedValue(),							);							$cekphase = $this->db->get_where('tbl_master_phase', $arrayphase)->row_array();							if(isset($cekphase)){								$tbl_master_phase_id = $cekphase['id'];							}else{								$statusdata = false;								$arrayphasesalah['phase_code'] = $worksheet->getCell("J".$i)->getCalculatedValue();								$arrayphasesalah['phase_name'] = $worksheet->getCell("K".$i)->getCalculatedValue();							}						}						if($worksheet->getCell("G".$i)->getCalculatedValue() != ""){							$arrayregion = array(								'region_code' => $worksheet->getCell("G".$i)->getCalculatedValue(),							);							$cekregion = $this->db->get_where('tbl_master_region', $arrayregion)->row_array();							if(isset($cekregion)){								$tbl_master_region_id = $cekregion['id'];							}else{								$statusdata = false;								$arrayregionsalah['region_code'] = $worksheet->getCell("G".$i)->getCalculatedValue();							}						}						if($worksheet->getCell("F".$i)->getCalculatedValue() != ""){							$arraysitestatus = array(								'site_status' => $worksheet->getCell("F".$i)->getCalculatedValue(),							);							$ceksitestatus = $this->db->get_where('tbl_master_sitename', $arraysitestatus)->row_array();							if(isset($ceksitestatus)){								$tbl_master_sitename_id = $ceksitestatus['id'];							}else{								$statusdata = false;								$arraysitestatussalah['sitestatus'] = $worksheet->getCell("F".$i)->getCalculatedValue();							}						}						if($worksheet->getCell("P".$i)->getCalculatedValue() != ""){							$arrayponesalah = array(								'po_ne' => $worksheet->getCell("P".$i)->getCalculatedValue(),							);							$cekpone = $this->db->get_where('tbl_master_pone', $arrayponesalah)->row_array();							if(isset($cekpone)){								$tbl_master_pone_id = $cekpone['id'];							}else{								$statusdata = false;								$arrayponesalah['pone'] = $worksheet->getCell("P".$i)->getCalculatedValue();							}						}												if($statusdata == true){							if($boquery == true){								$sqlboq = "									SELECT MAX(boqmaxid) as boq_max									FROM tbl_master_tracker_siteinfo									WHERE tbl_master_phase_id = '".$tbl_master_phase_id."'								";																$queryboq = $this->db->query($sqlboq)->row_array();								if($queryboq['boq_max'] != null){									$boqno = ($queryboq['boq_max'] + 1);									$boqno = $worksheet->getCell("J".$i)->getCalculatedValue()."-".sprintf('%07d', $boqno);									$boqaseli = ($queryboq['boq_max'] + 1);								}else{									$boqaseli = 1;									$boqno = $worksheet->getCell("J".$i)->getCalculatedValue()."-0000001";								}																$boquery = false;							}else{								$boqaseli = ($boqaseli + 1);								$boqno = $worksheet->getCell("J".$i)->getCalculatedValue()."-".sprintf('%07d', $boqaseli);								$boquery = false;							}														$arrayinsertbenar = array(								'tbl_master_phase_id' => $tbl_master_phase_id,								'tbl_master_region_id' => $tbl_master_region_id,								'tbl_master_sitename_id' => $tbl_master_sitename_id,								'tbl_master_pone_id' => $tbl_master_pone_id,								'boq_no' => $boqno,								'site_id' => $worksheet->getCell("C".$i)->getCalculatedValue(),								'site_name' => $worksheet->getCell("D".$i)->getCalculatedValue(),								'sow_category' => $worksheet->getCell("E".$i)->getCalculatedValue(),								'area_name' => $worksheet->getCell("H".$i)->getCalculatedValue(),								'cluster' => $worksheet->getCell("I".$i)->getCalculatedValue(),								'sow_detail' => $worksheet->getCell("L".$i)->getCalculatedValue(),								'system_key' => $worksheet->getCell("M".$i)->getCalculatedValue(),								'site_id_ori' => $worksheet->getCell("N".$i)->getCalculatedValue(),								'site_name_ori' => $worksheet->getCell("O".$i)->getCalculatedValue(),								'network_boq' => $worksheet->getCell("Q".$i)->getCalculatedValue(),								'wp_id_svc' => $worksheet->getCell("R".$i)->getCalculatedValue(),								'so_svc' => $worksheet->getCell("S".$i)->getCalculatedValue(),								'partner_ni' => $worksheet->getCell("T".$i)->getCalculatedValue(),								'partner_npo' => $worksheet->getCell("U".$i)->getCalculatedValue(),								'remarks_siteinfo' => $worksheet->getCell("V".$i)->getCalculatedValue(),								'status' => 1,								'update_by' => $this->auth['nama_user'],								'update_date' => date('Y-m-d H:i:s'),								'filename' => $filen,								'boqmaxid' => $boqaseli							);														if($method == 'N'){								$arrayisiboq = array(									'boqno' => $boqno								);																array_push($array_benar, $arrayinsertbenar);								array_push($arrayboq, $arrayisiboq);							}elseif($method == 'U'){								$id = $worksheet->getCell("A".$i)->getCalculatedValue();								if($id){									unset($arrayinsertbenar['boqmaxid']);									$this->db->update('tbl_master_tracker_siteinfo', $arrayinsertbenar, array('id'=>$id) );								}							}													}else{							$arrayinsertsalah = array(								'row' => $i,								'phase' => $arrayphasesalah,								'region' => $arrayregionsalah,								'sitestatus' => $arraysitestatussalah,								'pone' => $arrayponesalah,							);							array_push($array_salah, $arrayinsertsalah);						}					}										if($arrayboq){						$this->db->insert_batch('tbl_master_tracker_siteprogress', $arrayboq);						$this->db->insert_batch('tbl_master_tracker_sitebinder', $arrayboq);						$this->db->insert_batch('tbl_master_tracker_mcr', $arrayboq);						$this->db->insert_batch('tbl_master_tracker_costsales', $arrayboq);						$this->db->insert_batch('tbl_master_tracker_atf', $arrayboq);						$this->db->insert_batch('tbl_master_tracker_accclosing', $arrayboq);					}										if($array_benar){						$arrayupload = array(							'type_tracker' => $type,							'filename' => $filen,							'type_upload' => $method,							'remark' => $this->input->post('remark'),							'update_by' => $this->auth['nama_user'],							'update_date' => date('Y-m-d H:i:s')						);						$this->db->insert('tbl_uploader_tracker', $arrayupload);					}					$table = "tbl_master_tracker_siteinfo";									break;			}						if(!empty($array_salah)){				return $array_salah;				//exit;			}else{				if($array_benar){					$this->db->insert_batch($table, $array_benar);					return 1;				}else{					return 0;				}			}						/*			if($this->db->trans_status() == false){				$this->db->trans_rollback();				return 0;			}else{				return $this->db->trans_commit();			}			*/					}			}	}