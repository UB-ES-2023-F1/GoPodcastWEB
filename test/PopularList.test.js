import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PopularList from '../src/components/PopularList.vue';

const flushPromises = require('flush-promises');

describe('PopularList Tests!', () => {
    
    it('Comprobación de DOM', async () => {
        // Creamos el DOM
        const wrapper = mount(PopularList);

        // Esperamos a que acaben todas las promises
        await flushPromises();

        // Comprobamos que el componente tiene elementos clave en el DOM
        const podcastElements = wrapper.findAll('.podcast');
        expect(podcastElements.length).toBe(wrapper.vm.podcasts.length);

        const podcastElement = podcastElements[0];
        const nameElement = podcastElement.find('.name');
        const imgElement = podcastElement.find('img');

        const podcast = wrapper.vm.podcasts[0];
        expect(nameElement.text()).toBe(podcast.title);
        expect(imgElement.exists()).toBeTruthy();
        expect(imgElement.attributes('src')).toBe(`src/assets/${podcast.image_url}`);
    });

    // Test unitario para la funcionalidad de hacer scroll izquierdo
    it('Hacer scroll izquierdo', async () => {
        const wrapper = mount(PopularList);

        // Llamamos al evento de scroll en el contenedor de podcasts
        const wheelEvent = new WheelEvent('wheel', { deltaX: 10 });
        wrapper.vm.$refs.podcastsContainer.dispatchEvent(wheelEvent);

        await flushPromises();

        // Comprobamos que el scrollLeft ha cambiado
        const podcastsContainer = wrapper.vm.$refs.podcastsContainer;
        expect(podcastsContainer.scrollLeft).toBeGreaterThanOrEqual(10);
    });

    // Test unitario para la funcionalidad de hacer scroll derecho
    it('Hacer scroll derecho', async () => {
        const wrapper = mount(PopularList);

        // Llamamos al evento de scroll en el contenedor de podcasts
        const wheelEvent = new WheelEvent('wheel', { deltaX: -10 });
        wrapper.vm.$refs.podcastsContainer.dispatchEvent(wheelEvent);

        await flushPromises();

        // Comprobamos que el scrollLeft ha cambiado
        const podcastsContainer = wrapper.vm.$refs.podcastsContainer;
        expect(podcastsContainer.scrollLeft).toBeLessThanOrEqual(-10);
    });
});
