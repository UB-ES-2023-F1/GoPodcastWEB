
// Import for all test files
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoryList from '../src/components/CategoryList.vue'

// Import if there's a API call. To mockup the server
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { beforeAll, afterEach, afterAll, beforeEach } from 'vitest'

// Global variables
const flushPromises = require('flush-promises');
const backendURL = 'http://gopodcastapidev.azurewebsites.net'


// Setting up the handlers
export const restHandlers = [
    rest.get(backendURL + '/categories', (request, response, ctx) => {
        return response(
            ctx.status(200),
            ctx.json([
                { id: 1, image_url: 'categories/categorySport.jpg', title: "Science" },
                { id: 2, image_url: 'categories/categoryEntertainment.jpg', title: "Videogames" }
            ])
        );
    }),
]

export const restErrHandlers = [
    rest.get(backendURL + '/categories', (request, response, ctx) => {
        return response(
            ctx.status(500),
            ctx.json({ ERROR: "Some error during the connection" })
        )
    })
]

const server = setupServer(...restHandlers)
const errServer = setupServer(...restErrHandlers)

// Start before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test. Important for test isolation
afterEach(() => server.resetHandlers())


// Categoria de tests
describe('CategoryList Tests!', () => {
    
    // Test unitario
    // En este tipo de tests queremos comprobar que las piezas clave del componente estan,
    // en este caso, por ejemplo, como haremos una lista de categorias, 
    // queremos la categoria tenga un titulo (h2) y que cada elemento de la categoria tenga una imagen (img) y un nombre (span)
    it('Comprobación de DOM', async () => {
        // Creamos el DOM (es como si se creara la web)
        const wrapper = mount(CategoryList)

        // Esperamos a que acaben todas las promises (como la función de created() de getCategories)
        await flushPromises();

        // Comprueba que el componente tiene un H2
        expect(wrapper.find('h2').exists()).toBeTruthy()

        // Comprueba que el componente tiene una imagen
        expect(wrapper.find('img').exists()).toBeTruthy()

        // Comprueba que el componente tiene un span
        expect(wrapper.find('span').exists()).toBeTruthy()

    })

    // Test unitario
    it('200 response. /categories', async () => {
        // Creamos el DOM (es como si se creara la web)
        const wrapper = mount(CategoryList)

        // Esperamos a que acaben todas las promises (como la función de created() de getCategories)
        await flushPromises();

        // Comprobamos que el resultado de la función getCategories() es correcto. La llamada de axios.get de getCategories se ha hecho al mockup server que hemos inicializado antes
        expect(wrapper.vm.categories).toEqual([
            { id: 1, image_url: 'categories/categorySport.jpg', title: "Science" },
            { id: 2, image_url: 'categories/categoryEntertainment.jpg', title: "Videogames" }
        ])
    })

    // Test unitario
    it('Error response. /categories', async () => {
        // Debido a que se abre el server correcto, lo cerramos y abrimos el servidor de errores.
        server.close()
        errServer.listen()

        // Creamos la consola 'falsa' para poder 'trackearla'
        const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)
        
        // Creamos el DOM (es como si se creara la web)
        const wrapper = mount(CategoryList)

        // Esperamos a que acaben todas las promises (como la función de created() de getCategories)
        await flushPromises();

        // Hacemos la comprobación
        expect(consoleMock).toHaveBeenCalledOnce()
    })
})