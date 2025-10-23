import { API_KEY } from '@/k';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { ComponentProps, FC } from 'react';

export const MyMap:FC<ComponentProps<typeof Map> > = ({...props}) => {
    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                defaultCenter={{
                    lat: 23.158429955593782,
                    lng: 42.98542799663272,
                }}
                defaultZoom={6.6}
                mapId={'ed23aa98c0a50d9945c2d1c7'}
                {...props}
            />
        </APIProvider>
    );
};
