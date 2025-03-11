const API = 'https://api-finance.profileporto.site/api';
// const API = 'http://127.0.0.1:8000/api';
// const API = 'https://be-sss-dev.sanohindonesia.co.id:8443/api';

const getRolePath = () => {
    const userRole = localStorage.getItem('role');
    return userRole ? `/${userRole}` : '';
};

// login API endpoint
export const API_Login = () => API + '/login';

// logout API endpoint
export const API_Logout = () => API + getRolePath() + `/logout`;

// Global User API
export const API_Dashboard = () => API + getRolePath() + `/dashboard`;

// Super Admin API
export const API_List_Partner_Admin = () => API + getRolePath() + `/business-partners`;
// export const API_Sync_Admin = () => API + getRolePath() + `/sync-inv-line`;

// Manage User Admin
export const API_User_Online_Admin = () => API + getRolePath() + `/active-user`;
export const API_User_Logout_Admin = () => API + getRolePath() + `/logout-user`;

// Manage User Admin
export const API_List_User_Admin = () => API + getRolePath() + '/index';
export const API_Create_User_Admin = () => API + getRolePath() + '/store';
export const API_Edit_User_Admin = () => API + getRolePath() + '/edit/';
export const API_Update_User_Admin = () => API + getRolePath() + '/update/';
export const API_Delete_User_Admin = () => API + getRolePath() + `/delete/`;
export const API_Update_Status_Admin = () => API + getRolePath() + `/status/`;

// Invoice Management Admin
export const API_Inv_Header_Admin = () => API + getRolePath() + `/inv-header`;
export const API_Inv_Header_By_Bp_Code_Admin = () => API + getRolePath() + `/inv-header/bp-code/`;
export const API_Create_Inv_Header_Admin = () => API + getRolePath() + `/inv-header/store`;
export const API_Update_Inv_Header_Admin = () => API + getRolePath() + `/inv-header/`;
export const API_Update_In_Process_Admin = () => API + getRolePath() + `/inv-header/`;

// Invoice Lines Admin
export const API_Inv_Line_Admin = () => API + getRolePath() + `/inv-line`;
export const API_Inv_Line_By_Inv_No_Admin = () => API + getRolePath() + `/inv-line/`;

// Document Streaming Admin
export const API_Stream_File_Admin = () => API + getRolePath() + `/files/`;

// Finance API
export const API_Inv_Header_Finance = () => API + getRolePath() + `/inv-header`;
export const API_Inv_Header_By_Bp_Code_Finance = () => API + getRolePath() + `/inv-header/bp-code/`;
export const API_Update_Inv_Header_Finance = () => API + getRolePath() + `/inv-header/`;
export const API_Update_Status_To_In_Process_Finance = () => API + getRolePath() + `/inv-header/in-process`;

// Invoice Lines Finance
export const API_Inv_Line_By_Inv_No_Finance = () => API + getRolePath() + `/inv-line/`;

// Document Streaming Finance
export const API_Stream_File_Finance = () => API + getRolePath() + `/files/`;

// Supplier API
export const API_Inv_Header_Supplier = () => API + getRolePath() + `/inv-header`;
export const API_Create_Inv_Header_Supplier = () => API + getRolePath() + `/inv-header/store`;

// Invoice Lines Supplier
export const API_Inv_Line_Supplier = () => API + getRolePath() + `/inv-line`;
export const API_Inv_Line_By_Inv_No_Supplier = () => API + getRolePath() + `/inv-line/`;

// Get Pph And Ppn
export const API_Pph = () => API + getRolePath() + `/pph`;
export const API_Ppn = () => API + getRolePath() + `/ppn`;
