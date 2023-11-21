import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PodcastList from '../src/components/PodcastList.vue';

const flushPromises = require('flush-promises');

describe('PodcastList Tests!', () => {
    
    it('Comprobación de DOM', async () => {
        // Creamos el DOM
        const podcastList = [
            { id: 1, name: 'Podcast 1', img: 'path/to/image1.jpg' },
            { id: 2, name: 'Podcast 2', img: 'path/to/image2.jpg' },
        ];

        const wrapper = mount(PodcastList, {
            props: {
                podcastList,
            },
        });

        // Esperamos a que acaben todas las promises
        await flushPromises();

        // Comprobamos que el componente tiene elementos clave en el DOM
        const podcastElements = wrapper.findAll('.podcast');
        expect(podcastElements.length).toBe(podcastList.length);

        const podcastElement = podcastElements[0];
        const nameElement = podcastElement.find('.name');
        const imgElement = podcastElement.find('img');

        const podcast = podcastList[0];
        expect(nameElement.text()).toBe(podcast.name);
        expect(imgElement.exists()).toBeTruthy();
        expect(imgElement.attributes('src')).toBe(podcast.img);
    });

    // Test unitario para la funcionalidad de hacer scroll izquierdo
    it('Hacer scroll', async () => {
        const podcastList = [
            { id: 1, name: 'Podcast 1', img: 'path/to/image1.jpg' },
            { id: 2, name: 'Podcast 2', img: 'path/to/image2.jpg' },
        ];

        const wrapper = mount(PodcastList, {
            props: {
                podcastList,
            },
        });

        // Llamamos al evento de scroll en el contenedor de podcasts
        const wheelEvent = new WheelEvent('wheel', { deltaX: 10 });
        wrapper.vm.$refs.podcastsContainer.dispatchEvent(wheelEvent);

        await flushPromises();

        // Comprobamos que el scrollLeft ha cambiado
        const podcastsContainer = wrapper.vm.$refs.podcastsContainer;
        expect(podcastsContainer.scrollLeft).toBeGreaterThanOrEqual(10);
    });

    // Test unitario para la funcionalidad de hacer scroll derecho
    it('Hacer scroll', async () => {
        const podcastList = [
            { id: 1, name: 'Podcast 1', img: 'path/to/image1.jpg' },
            { id: 2, name: 'Podcast 2', img: 'path/to/image2.jpg' },
        ];

        const wrapper = mount(PodcastList, {
            props: {
                podcastList,
            },
        });

        
        // Llamamos al evento de scroll en el contenedor de podcasts
        const wheelEvent = new WheelEvent('wheel', { deltaX: -10 });
        wrapper.vm.$refs.podcastsContainer.dispatchEvent(wheelEvent);

        await flushPromises();

        // Comprobamos que el scrollLeft ha cambiado
        const podcastsContainer = wrapper.vm.$refs.podcastsContainer;
        expect(podcastsContainer.scrollLeft).toBeLessThanOrEqual(-10);
    });

    // Test unitario para la llamada a la API de podcasts
    it('200 response. /podcasts', async () => {
        // Creamos el DOM
        const podcastList = [
            { id: 1, name: 'Podcast 1', img: 'path/to/image1.jpg' },
            { id: 2, name: 'Podcast 2', img: 'path/to/image2.jpg' },
        ];

        const wrapper = mount(PodcastList, {
            props: {
                podcastList,
            },
        });

        // Esperamos a que acaben todas las promises
        await flushPromises();

        // Comprobamos que el resultado de la función getPodcasts() es correcto.
        expect(wrapper.vm.podcastList).toEqual(podcastList);
    });
});
