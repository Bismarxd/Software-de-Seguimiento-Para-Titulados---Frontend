import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const LoginPrivado = ({ children } : any) => {
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('valid')) {
            router.push('/')
        } 
    }, [router])

    if (!localStorage.getItem('valid')) {
        return null // o un spinner de carga u otro marcador de posición
    }

    return <>{children}</>
}

LoginPrivado.propTypes = {
    children: PropTypes.node.isRequired,
}

export default LoginPrivado