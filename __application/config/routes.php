<?php defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'backend';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

// Routing Core
$route['backoffice'] = 'backend';
$route['backoffice-masuk'] = 'login';
$route['backoffice-keluar'] = 'login/logout';
$route['Backoffice-Grid/(:any)'] = 'backend/get_grid/$1';
$route['backoffice-form/(:any)'] = 'backend/get_form/$1';
$route['backoffice-Data/(:any)'] = 'backend/getdata/$1';
$route['backoffice-GetDetil'] = 'backend/get_konten';
$route['backoffice-konten/(:any)'] = 'backend/get_konten/$1';
$route['backoffice-simpan/(:any)/(:any)'] = 'backend/simpandata/$1/$2';

// Modul POIN
$route['beranda'] = 'backend/modul/beranda/main';




/* Routes Front End Routes */



