import { Routes } from '@angular/router';
import { Login} from './login/login';
import { Register } from './register/register';
import { DashboardComponent } from './dashboard/dashboard';
import { CustomerProfile } from './customer-profile/customer-profile';
import { CreditHistoryComponent } from './credit-history/credit-history';
import { AuditLogComponent } from './audit-log/audit-log';
import { CreditScore } from './credit-score/credit-score';
import { ReportComponent } from './report/report';


export const routes: Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'customer-profile', component: CustomerProfile },
    { path: 'credit-history', component: CreditHistoryComponent },
    { path: 'audit-log', component: AuditLogComponent },
    { path: 'credit-score', component: CreditScore },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'report', component:ReportComponent}
];
