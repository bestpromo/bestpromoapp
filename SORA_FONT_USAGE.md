# Guia de Uso da Fonte Sora

## Fonte Padrão
A fonte Sora Regular agora é a padrão do projeto. Todos os textos usarão automaticamente `Sora_400Regular`.

## Classes Disponíveis

### Weights Disponíveis:
- `font-thin` → Sora_100Thin
- `font-extralight` → Sora_200ExtraLight  
- `font-light` → Sora_300Light
- `font-regular` → Sora_400Regular (padrão)
- `font-medium` → Sora_500Medium
- `font-semibold` → Sora_600SemiBold
- `font-bold` → Sora_700Bold
- `font-extrabold` → Sora_800ExtraBold

## Exemplos de Uso:

```tsx
// Texto normal (usa Sora Regular automaticamente)
<Text className="text-base">Texto padrão com Sora</Text>

// Diferentes pesos
<Text className="font-light text-lg">Texto Light</Text>
<Text className="font-medium text-lg">Texto Medium</Text>
<Text className="font-bold text-lg">Texto Bold</Text>
<Text className="font-extrabold text-xl">Título Extra Bold</Text>

// Títulos de seções
<Text className="font-semibold text-lg">Ofertas do Dia</Text>

// Preços
<Text className="font-bold text-emerald-600">R$ 299,90</Text>

// Nome de produtos
<Text className="font-medium text-gray-800">Nome do Produto</Text>
```

## Configuração Aplicada:

1. ✅ Fontes instaladas via `@expo-google-fonts/sora`
2. ✅ Carregamento das fontes no `app/_layout.tsx`
3. ✅ Configuração no `tailwind.config.js`
4. ✅ Sora Regular como fonte padrão (`sans`)

Agora todos os textos do app usarão a família Sora automaticamente!
