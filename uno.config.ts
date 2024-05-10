import { defineConfig, presetAttributify, presetUno, presetWind, presetIcons } from "unocss";


export default defineConfig({
    presets: [
        presetAttributify(),
        presetUno(),
        presetWind(),
        presetIcons({
            collections: {
                tabler: () => import("@iconify-json/tabler").then(i => i.default as any)
            }
        })
    ],
})