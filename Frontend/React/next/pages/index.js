import React from 'react';
import Router from 'next/router'
import Link from 'next/link';


/**
 * routeChangeStart
 * routeChangeComplete
 * beforeHistoryChange
 * routeChangeError
 * hashChangeStart
 * hashChangeComplete
 */

Router.events.on('routeChangeStart', (...args) => {
    console.log('routeChangeStart', ...args);
})
function goToPage() {
    Router.push('/page2');
}

const Index = () => (
    <div>
        <p>Hello Next.js</p>
        <Link href="page2"><a>Go to page2</a></Link>
        <button onClick={goToPage}>Go to page 2</button>
    </div>
)

export default Index;