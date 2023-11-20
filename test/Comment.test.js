import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Comment from '../src/components/Comment.vue'

// Global variables
const flushPromises = require('flush-promises');


describe('Comment Tests!', () => {

    
    it('Comprobación de DOM', async () => {
        // Creamos el DOM (es como si se creara la web)
        const wrapper = mount(Comment, {
            props: {
                comment: {
                    date: new Date(),
                    text: 'This is a comment',
                    replies: [],
                },
            },
        });

        // Esperamos a que acaben todas las promises
        await flushPromises();

        // Comprobamos que el componente tiene elementos clave en el DOM
        expect(wrapper.find('.comment-header').exists()).toBeTruthy();
        expect(wrapper.find('span').exists()).toBeTruthy();
        expect(wrapper.find('.comment-date').exists()).toBeTruthy();
        expect(wrapper.find('.comment-content').exists()).toBeTruthy();
        expect(wrapper.find('p').exists()).toBeTruthy();
        expect(wrapper.find('form.publish-form').exists()).toBeTruthy();
        expect(wrapper.find('.comment-replies').exists()).toBeTruthy();
    })

    // Test unitario para la funcionalidad de añadir una respuesta
    it('Añadir respuesta', async () => {
        // Creamos el DOM (es como si se creara la web)
        const wrapper = mount(Comment, {
            props: {
                comment: {
                    date: new Date(),
                    text: 'Original Comment',
                    replies: [],
                },
            },
        });

        // Esperamos a que acaben todas las promises
        await flushPromises();

        // Simulamos la entrada de texto en el campo de respuesta y añadimos respuesta con el submit
        await wrapper.setData({ newReplyText: 'This is a reply' });
        await wrapper.find('form.publish-form').trigger('submit');

        // Esperamos a que acaben todas las promises
        await flushPromises();

        // Agregamos un log para verificar el estado después del envío
        console.log(wrapper.vm.comment);

        // Comprobamos que la respuesta se ha agregado correctamente
        expect(wrapper.vm.comment.replies.length).toBe(1);
        expect(wrapper.vm.comment.replies[0].text).toBe('This is a reply');
    })

    // Test unitario para la funcionalidad de añadir una respuesta vacía
    it('Añadir respuesta vacía', async () => {
        // Creamos el DOM (es como si se creara la web)
        const wrapper = mount(Comment, {
            props: {
                comment: {
                    date: new Date(),
                    text: 'Original Comment',
                    replies: [],
                },
            },
        });

        // Esperamos a que acaben todas las promises
        await flushPromises();

        // Simulamos la entrada de texto en el campo de respuesta y añadimos respuesta con el submit
        await wrapper.setData({ newReplyText: '' });
        await wrapper.find('form.publish-form').trigger('submit');

        // Esperamos a que acaben todas las promises
        await flushPromises();

        // Agregamos un log para verificar el estado después del envío
        console.log(wrapper.vm.comment);

        // Comprobamos que la respuesta se ha agregado correctamente
        expect(wrapper.vm.comment.replies.length).toBe(0);
    })

    // Test unitario para la funcionalidad de añadir una respuesta dentro de una respuesta
    it('Test Método formatDate', () => {
        const wrapper = mount(Comment, {
            props: {
                comment: {
                    // Definimos una determinada fecha a testear
                    date: new Date('2023-11-20T20:30:00'),
                    text: 'Original Comment',
                    replies: [],
                },
            },
        });

        const componenteInstancia = wrapper.vm;

        // Usamos el método con la fehca de ejemplo
        const fechaMethod = componenteInstancia.formatDate(wrapper.vm.comment.date);

        expect(fechaMethod).toBe('Mon Nov 20 2023');
    });


})
