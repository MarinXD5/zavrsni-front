import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private fireServices: AngularFirestore){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }

  private isAuthorized(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.getUserFromFireStoreAuth().then(user => {
        const accessRole: any = 'Admin'; 
        const uid = user.uid;
        this.getRole(uid)
          .then(userRole => {
            resolve(userRole === accessRole);
          })
          .catch(error => {
            console.error(error);
            reject(false);
          });
      }).catch(error => {
        console.error(error);
        resolve(false);
      });
    });
  }

  getRole(uid: string): Promise<string>{
    return this.fireServices.collection('users').doc(uid).get().toPromise().then(docSnapShot => {
      if (docSnapShot?.exists){
        const data: any = docSnapShot.data();
        if (data && typeof data.role === 'string'){
          const role = data.role;
          return role;
        }else{
          throw new Error("Invalid role data");
        }
      }
      else{
        throw new Error("User doc not found");
      }
    }).catch(error => {
      console.error("Error retrieving role", error);
      throw error;
    })
  }
  
}
