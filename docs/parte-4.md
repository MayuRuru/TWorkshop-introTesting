## Parte 4. Escribe los tests para bloquear la account

Para aqui! Intenta escribir los siguientes tests por tu cuenta antes de mirar las soluciones. Puedes hacer un fork de este repositorio y duplicar la carpeta `solucion-parte-3` para hacerlo o seguir los pasos de las partes 1, 2 y 3 hasta llegar a este punto. Recuerda usar TDD.

1. Teniendo una cuenta nueva, Cuando llamo a getBlockAccount, Espero que devuelva false por defecto.
Consejo: El proposito de getBlockAccount es que nos diga si la cuenta esta bloqueada (true) o no (false). Tendremos que crear primero un test en el que se llame a una nueva funcion llamada getBlockAccount y esperamos que devuelva false (la cuenta estara desbloqueada cuando se crea). A la hora de escribir el codigo, recuerda escribir el minimo codigo posible para que este test pase.

2. Teniendo una cuenta nueva, Cuando llamo a blockAccount, Espero que getBlockAccount devuelva true.
Consejo:  Aqui escribiremos un nuevo test que llame a otro nuevo metodo llamado blockAccount. Esperamos que al llamar a blockAccount, esta funcion bloquee la cuenta. A partir de ese momento, las llamadas a getBlockAccount deberian de devolver true ya que la cuenta esta bloqueada.

3. Teniendo una cuenta nueva, Cuando llamo a blockAccount y luego llamo a setAmount con un numero, Espero recibir un error.
Consejo: Cuando nuestra cuenta esta bloqueada, no queremos que nadie pueda cambiar la cantidad de dinero que hay en ella. Por eso, setAmount deberia de devolver siempre un error si se le llama y la cuenta esta bloqueada. Recuerda empezar escribiendo primero el test.

Si quieres ver la solucion, mira la [parte 5](./parte-5.md).