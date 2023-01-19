import { createShaderProgram } from '../../glx/shader_program.mjs'
import vsSource from './flat.vert?raw'
import fsSource from './flat.frag?raw'

export const createFlatShader = gl => createShaderProgram(gl, vsSource, fsSource)
