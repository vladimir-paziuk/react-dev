import {Suspense, lazy} from 'react'

const ConcurrentNested = lazy(() => import('./ConcurrentNested'));

export const Concurrent = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ConcurrentNested />
            </Suspense>
        </div>
    )
}
