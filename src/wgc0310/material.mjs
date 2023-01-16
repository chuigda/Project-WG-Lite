import {createMaterial} from '../glx/material.mjs'

export const loadMaterial = () => ({
   plastic: createMaterial([0.2, 0.2, 0.2], [0.55, 0.55, 0.55]),
   blackPlastic: createMaterial([0.15, 0.15, 0.15], [0.25, 0.25, 0.25]),
   chrome: createMaterial([0.25, 0.25, 0.25], [0.4, 0.4, 0.4]),
   brass: createMaterial([0.329412, 0.223529, 0.027451], [0.780392, 0.568627, 0.113725])
})
