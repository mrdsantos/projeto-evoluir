import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	...compat.config({
		extends: ["next", "prettier"],
		rules: {
			"no-unused-vars": "off", // Desativa regra padrão do ESLint
			"@typescript-eslint/no-unused-vars": ["error"], // Usa a versão do TypeScript para evitar variáveis não utilizadas
		},
	}),
]

export default eslintConfig
