<template>
  <q-dialog
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    class="q-pa-none"
    @hide="stopReader"
  >
    <q-card class="text-white" id="card">
      <q-card-section
        class="q-pa-none full-height q-ma-none full-width"
        id="section"
      >
        <div class="full-width" style="height: 25%">
          <q-bar>
            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
        </div>
        <div id="reader"></div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Quagga from 'quagga';

export default defineComponent({
  name: 'QRCodeDialog',
  props: {
    init: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup(props, { emit }) {
    watch(
      () => props.init,
      (newValue) => {
        if (newValue) {
          initReader();
        } else {
          stopReader();
        }
      }
    );

    const initReader = () => {
      setTimeout(() => {
        const width: number =
          document.getElementById('section')?.offsetWidth ?? 0;
        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: document.querySelector('#reader'),
              constraints: {
                width: width - 1,
                height: 250,
              },
            },
            debug: {
              showCanvas: false,
            },
            decoder: {
              readers: [
                'ean_reader',
                'ean_5_reader',
                'ean_2_reader',
                'code_128_reader',
              ],
            },
          },
          function (err: any) {
            document.querySelectorAll('.drawingBuffer')[0].remove();

            if (err) {
              console.log(err);
              return;
            }
            console.log('Initialization finished. Ready to start');
            Quagga.start();

            Quagga.onDetected((data: any) => {
              emit('setCode', data.codeResult.code);
              stopReader();
            });
          }
        );
      }, 1000);
    };

    const stopReader = () => {
      Quagga.stop();
    };
    return {
      stopReader,
    };
  },
});
</script>
