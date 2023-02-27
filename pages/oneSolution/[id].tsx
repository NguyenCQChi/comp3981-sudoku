import React from 'react';
import OneSolutionGrid from '@src/containers/OneSolution';

function Solution({size} : {size: String}) {
  return (
    <OneSolutionGrid 
    size = {size} />
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      {params : {id: '9x9'}},
      {params : {id: '12x12'}},
      {params : {id: '16x16'}},
      {params : {id: '25x25'}},
      {params : {id: '100x100'}}
    ],
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: any) {
  const id = context.params.id;
  return {
    props: {
      size: id.split("x")[0]
    }
  }
}

export default Solution;