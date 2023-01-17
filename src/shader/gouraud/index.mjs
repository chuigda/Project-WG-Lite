import { createShaderProgram } from '../../glx/shader_program.mjs'
import vsSource from './vertex.mjs'
import fsSource from './fragment.mjs'

export const createGouraudShader = gl => createShaderProgram(gl, vsSource, fsSource)
