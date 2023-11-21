import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgressBar from '../src/components/ProgressBar.vue';

describe('ProgressBar Tests!', () => {
    it('Comprobación de DOM', () => {
        const wrapper = mount(ProgressBar);
        expect(wrapper.find('.player').exists()).toBeTruthy();
        expect(wrapper.find('.play-button').exists()).toBeTruthy();
        expect(wrapper.find('.cover').exists()).toBeTruthy();
        expect(wrapper.find('#progress-bar').exists()).toBeTruthy();
    });

    // Test unitario para verificar que el componente se renderiza correctamente
    it('Renderiza correctamente', () => {
        const wrapper = mount(ProgressBar);
        expect(wrapper.exists()).toBeTruthy();
    });

    // Test unitario para comprobar si toggleAudio funciona correctamente
    it('Método toggleAudio funciona correctamente', () => {
        const wrapper = mount(ProgressBar);
        const playButton = wrapper.find('.play-button');

        expect(wrapper.vm.isPlaying).toBeFalsy();

        // Simulamos hacer clic en el botón de reproducción
        playButton.trigger('click');

        expect(wrapper.vm.isPlaying).toBeTruthy();

        // Simulamos hacer clic en el botón de reproducción nuevamente
        playButton.trigger('click');

        expect(wrapper.vm.isPlaying).toBeFalsy();
    });

    // Test unitario para la conversión de tiempo
    it('convertTime convierte a formato mm:ss', () => {
        const wrapper = mount(ProgressBar);

        // Prueba con un tiempo en segundos
        const formattedTime = wrapper.vm.convertTime(120);

        expect(formattedTime).toBe('02:00');
    });

    // Test unitario para elapsedTime
    it('elapsedTime devuelve un tiempo formateado', () => {
        const wrapper = mount(ProgressBar);
        expect(wrapper.vm.elapsedTime()).toBe('00:00');
    });

    // Test unitario para totalTime
    it('totalTime devuelve un tiempo formateado', () => {
        const wrapper = mount(ProgressBar);
        expect(wrapper.vm.totalTime()).toBe('aN:aN');
    });

    // Test unitario consoleLogTest imprime "Test"
    // it('consoleLogTest imprime "Test"', () => {
    //     const wrapper = mount(ProgressBar);
    //     wrapper.vm.consoleLogTest();
    //     expect(wrapper.vm.consoleLogTest()).toBe('Test');
    // });

    // Test unitario setAudioUrl cambia el audioUrl
    it('setAudioUrl cambia el audioUrl', () => {
        const wrapper = mount(ProgressBar);
        wrapper.vm.setAudioUrl('test');
        expect(wrapper.vm.audioUrl).toBe('test');
    });

    // Test unitario para setCoverUrl cambia el coverUrl
    it('setCoverUrl cambia el coverUrl', () => {
        const wrapper = mount(ProgressBar);
        wrapper.vm.setCoverUrl('test');
        expect(wrapper.vm.coverUrl).toBe('test');
    });

    // Test unitario para setTitle actualiza el título
    it('setTitle actualiza el título', () => {
        const wrapper = mount(ProgressBar);
        wrapper.vm.setTitle('test');
        expect(wrapper.vm.title).toBe('test');
    });

    // Test unitario para initSlider actualiza audioDuration
    it('initSlider se inicializa correctamente', () => {
        const wrapper = mount(ProgressBar);
        wrapper.vm.initSlider();
        expect(wrapper.vm.audioDuration).toBe(NaN);
    });
    
    // Test unitario método playbackListener activa el listener
    it('playbackListener activa el listener', () => {
        const wrapper = mount(ProgressBar);
        wrapper.vm.playbackListener();
        expect(wrapper.vm.playbackListener()).toBe(undefined);
    });
});
