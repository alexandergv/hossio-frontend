// import jwt from 'jsonwebtoken';
// const JWT_SECRET = 'hossio'; 

// function getSession(token: any) {
//     if (token) {
//       try {
//         // Decodifica el JWT y verifica su validez
//         const decoded = jwt.verify(token, JWT_SECRET);
//         return { authenticated: true, user: decoded };
//       } catch (err) {
//         // Token inválido o expirado
//         return { authenticated: false, user: null };
//       }
//     }
    
//     return { authenticated: false, user: null };
//   }
  

// export function onRequest ({ locals, request } : any, next: any) {
//     // interceptar los datos de una solicitud.
//     // opcionalmente, modifica las propiedades en `locals`.
//     let token = request.headers.get('Cookie')?.split(';').find((c :string) => c.trim().startsWith('auth_token='));
//     token = token ? token.split('=')[1] : null
//     const url = new URL(request.url);
//     const pathname = url.pathname;
    
//     const session = getSession(token);
//     locals.isAuthenticated = session.authenticated;
//     locals.user = session.user;
//     console.log(session);

//     if (token) {
//         let Location = '';
//         if(locals.user?.role == 'owner' && pathname != '/owners') {
//             Location = '/owners';
//         } else if (pathname == '/login' && locals.user?.role == 'user') {
//             Location = '/'
//         }

//         if(Location != '') {
//             return new Response(null, {
//                 status: 302,
//                 headers: {
//                     Location
//                 }
//             });
//         }
//     } else {
//         let Location = '';
//         if(pathname == '/owners') {
//             Location = '/';
//         }
        
//         if(Location != '') {
//             return new Response(null, {
//                 status: 302,
//                 headers: {
//                     Location
//                 }
//             });
//         }
//     }

//     // devuelve una respuesta o el resultado de llamar a `next()`.
//     return next();
// };