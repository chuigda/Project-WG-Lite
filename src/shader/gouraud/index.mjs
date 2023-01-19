import { createShaderProgram } from '../../glx/shader_program.mjs'

import vsSource from './gouraud.vert?raw'
import fsSource from './gouraud.frag?raw'

export const createGouraudShader = gl => createShaderProgram(gl, vsSource, fsSource)
