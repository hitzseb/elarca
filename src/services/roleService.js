import { jwtDecode } from 'jwt-decode';

export const getJwt = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        try {
            return jwtDecode(jwt);
        } catch (e) {
            console.error('Error al decodificar el token:', e);
            return null;
        }
    }
    return null;
};

export const switchRole = async (role) => {
    const base_url = 'http://localhost:8080/api/role/switch/' + role;
    const jwt = localStorage.getItem('jwt'); // Obtener el JWT del almacenamiento local
    console.log('JWT usado:', jwt);
    console.log('URL usada:', base_url);


    if (!jwt) {
        console.error('JWT no encontrado');
        return;
    }

    try {
        const response = await fetch(base_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}` // Agregar el JWT en el header Authorization
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Obtener los datos de la respuesta

        if (data.token) {
            localStorage.setItem('jwt', data.token); // Guardar el nuevo JWT en localStorage
            console.log('Nuevo JWT guardado en localStorage:', data.token);
        } else {
            console.error('No se recibió un nuevo token en la respuesta');
        }

        console.log('Rol cambiado exitosamente:', data);
        return data; // Retorna los datos recibidos si es necesario
    } catch (error) {
        console.error('Error al cambiar el rol:', error);
    }
};
