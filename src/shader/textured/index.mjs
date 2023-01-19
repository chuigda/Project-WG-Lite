import { createShaderProgram } from '../../glx/shader_program.mjs'
import vsSource from './textured.vert?raw'
import fsSource from './textured.frag?raw'

export const createTexturedShader = gl => createShaderProgram(gl, vsSource, fsSource)
