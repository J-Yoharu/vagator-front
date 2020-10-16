<template>
<div>

    <div class="text-gray-600 text-lg">
        <span class="f-red">*</span> Campos obrigatórios
    </div>

    <div class="mt-4 flex justify-between">
        <h1 class="text-gray-600 font-medium text-2xl">
            Informações pessoais
        </h1>
        <button>limpar</button>
    </div>

    <hr class="border">

    <div class="mt-5 mb-8">
        <form action="">
            
            <div class="flex justify-around">
                <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                    <label><span class="f-red">*</span> Nome</label>
                    <input aria-label="Email address" name="email" type="email" required 
                        class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </div>
                <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                    <label><span class="f-red">*</span> Sobrenome</label>
                    <input aria-label="Email address" name="email" type="email" required 
                        class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </div>
            </div>

            <div class="mt-6 flex justify-around">
                <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                    <label><span class="f-red">*</span> E-mail</label>
                    <input aria-label="Email address" name="email" type="email" required 
                        class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </div>
                <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                    <label><span class="f-red">*</span> Telefone</label>
                    <input aria-label="Email address" name="email" type="email" required 
                        class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </div>
            </div>

            <div class="w-full mt-6 font-semibold text-lg text-gray-600">
                <label><span class="f-red">*</span> Curriculo</label>
                <input aria-label="Email address" name="email" type="file" id="file" required class="hidden">
                <div class="mt-4 h-32">
                    <label for="file">
                        <div class="h-full text-gray-400 cursor-pointer flex justify-center items-center border border-dashed appearance-none">
                            <span class="f-red">Enviar um arquivo </span>⠀ou arraste e solte aqui
                        </div>
                    </label>
                </div>
            </div>

            <div class="mt-4 flex justify-between">
                <h1 class="text-gray-600 font-medium text-2xl">
                    Detalhes
                </h1>
                <button>limpar</button>
            </div>

            <hr class="border">

            <div class="w-full mt-4 font-semibold text-lg text-gray-600">
                <label><span class="f-red">*</span> Por que devemos contratá-lo? (em vez de outro candidato principal em sua área).</label>
                <textarea name="" style="resize:none"
                    class="block w-full h-40 p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </textarea>
            </div>

            <div class="w-full mt-4 font-semibold text-lg text-gray-600">
                <label><span class="f-red">*</span> Você conhece alguém que trabalha na UOTZ? se sim, escreva o nome dele aqui :).</label>
                <textarea name="" style="resize:none"
                    class="block w-full h-40 p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </textarea>
            </div>
        </form>
    </div>
    <div>
          <button class="p-5 w-full rounded-xl text-white text-2xl c-red">Enviar minha candidatura</button>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>