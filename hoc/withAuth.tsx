import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAdministrador } from '@/context/AdministradorContext';

interface Administrador {
  tipoAdministrador: number;
}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, allowedRoles: string[]): ComponentType<P> => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const administrador = useAdministrador();

    useEffect(() => {
      const role = administrador.tipoAdministrador === 1 ? 'administrador' : 'usuarioTitulado';

      if (!allowedRoles.includes(role)) {
        router.replace('/unauthorized'); // Redirigir a una página de no autorizado
      }
    }, [administrador, router]);

    const role = administrador.tipoAdministrador === 1 ? 'administrador' : 'usuarioTitulado';
    return allowedRoles.includes(role) ? <WrappedComponent {...props} /> : null;
  };

  // Set the display name for the HOC for better debugging and React DevTools integration
  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;