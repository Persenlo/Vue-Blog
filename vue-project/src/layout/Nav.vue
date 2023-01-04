<template>


  <div>
    <nav 
        style="user-select: none;"
        class=" px-4 py-4
                text-sm font-medium 
                block 
                rounded-xl 
                bg-white-bg
                md:bg-alpha
                ">
        <ul class="flex space-x-3 md:flex-col md:space-y-3 md:space-x-0">
            <slot></slot>
        </ul>
    </nav>
  </div>


</template>

<script>

</script>

<style>

</style>