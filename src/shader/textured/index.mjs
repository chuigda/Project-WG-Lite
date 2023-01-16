import { createShaderProgram } from '../../glx/shader_program.mjs'
import vsSource from './vertex.mjs'
import fsSource from './fragment.mjs'

export const createTexturedShader = gl => createShaderProgram(gl, vsSource, fsSource)
