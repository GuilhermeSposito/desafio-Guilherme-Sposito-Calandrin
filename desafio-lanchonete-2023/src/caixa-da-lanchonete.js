// itens vem itens que serão comprados. Cada item é uma string contendo o código do item e a quantidade do mesmo separados por uma vírgula. exemplo ['cafe,1','chantily,1'] neste caso, café e o codigo do produto e  o número é a quantidade 
// o retorno do calcular valor da compra deve SEMPRE SER UM STRING 
//--------------------------------------------------------------------------------------

//Primeiro criar a classe para identidicar códigos dos produtos que veem 
//Segundo criar um loop dentro do calcular valor 
//Terceiro dentro do loop precisamos a cada vez que olharmos um índice do array, separar com o slice a quantidade e o codigo do produto 
//Quarto após separar o código do produto, filtramos os objetos que tem os códigos validos dentro do this.produtos
//Quinto após fazer essa filtragem, percorremos o filter para fazer a soma dos valores * a quantidade que foi separada pelo slice ou se esta vazio  
//Sexto fora do loop, identificar o método de pagamento que esta chegando para a gente, e somar o desconto no valor final
//Setimo Retornar  o valor total, convertendo ele em R$ .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 

class CaixaDaLanchonete {

    constructor() {
        this.produtos = [
            {
                codigo: 'cafe',
                descricao: 'Café',
                valor: 3.00,
                extra: false
            },
            {
                codigo: 'chantily',
                descricao: 'Chantily (extra do Café)',
                valor: 1.50,
                extra: true
            },
            {
                codigo: 'suco',
                descricao: 'Suco Natural',
                valor: 6.20,
                extra: false
            },
            {
                codigo: 'sanduiche',
                descricao: 'Sanduíche',
                valor: 6.50,
                extra: false
            },
            {
                codigo: 'queijo',
                descricao: 'Queijo (extra do Sanduíche)',
                valor: 2.00,
                extra: true
            },
            {
                codigo: 'salgado',
                descricao: 'Salgado',
                valor: 7.25,
                extra: false
            },
            {
                codigo: 'combo1',
                descricao: '1 Suco e 1 Sanduíche',
                valor: 9.50,
                extra: false
            },
            {
                codigo: 'combo2',
                descricao: '1 Café e 1 Sanduíche',
                valor: 7.50,
                extra: false
            }
        ];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let valorTotalSemDescontos = 0              //valor total que vai ser modificado conforme corre o loop
        let temExtraComItemPrincipal = true         //variável que vai ser modificada caso haja extra sozinho ou não 
        let quantidadeValida = true                 //variável que vai ser modificada caso a quantidade colocada sejá valida 
        let temProduto = false                      //variável que vai ser modificada caso o código inserido seja valido

        if (itens.length !== 0) {
            itens.forEach(p => {
                const codigoProduto = p.slice(0, p.indexOf(",")).trim()   // separa o codigo do produto e limpa os espaços caso venha com espaços  
                const qtdProduto = parseFloat(p.slice(p.indexOf(",") + 1)) // separa a quantidade do produto 



                if (qtdProduto !== 0) { // verifica se a quantidade colocada é valida ou não 
                    quantidadeValida = true
                } else if (qtdProduto === 0) {
                    quantidadeValida = false
                }

                const produtosFiltrados = this.produtos.filter(item => {  //filtra o produto que vem 
                    return item.codigo === codigoProduto
                })

                if (produtosFiltrados.length > 0) { //verifica se o array filtrado vem vazio, se vier é porque o código colocado foi colocado inválido
                    temProduto = true
                }

                //verifica se extra esta sozinho // caso seja chantily ou queijo entra na verificação 
                if (codigoProduto === "chantily" || codigoProduto === "queijo") {

                    for (const item of itens) {
                        if (item.indexOf('cafe') !== -1 && codigoProduto === "chantily") {
                            temExtraComItemPrincipal = true
                            break
                        } else if (item.indexOf('sanduiche') !== -1 && codigoProduto === "queijo") {
                            temExtraComItemPrincipal = true
                            break
                        } else {
                            temExtraComItemPrincipal = false
                        }

                    }


                }

                produtosFiltrados.forEach(p => {//faz as soma do produto
                    valorTotalSemDescontos += p.valor * qtdProduto
                })

            });
        } else {
            return 'Não há itens no carrinho de compra!'
        }

        //variável para o valor final 
        let valorFinal
        //soma o desconto 
        let desconto
        if (metodoDePagamento === "debito") {
            //entra aqui e nao muda nada no valor total
            valorFinal = valorTotalSemDescontos
        } else if (metodoDePagamento === "credito") {
            //entra no credito e aumenta 3% no valor total 
            desconto = (3 / 100)
            const somarNovalorFinal = valorTotalSemDescontos * desconto
            valorFinal = valorTotalSemDescontos + somarNovalorFinal
        } else if (metodoDePagamento === "dinheiro") {
            //entra no dinheiro e desconta 5% do valor final 
            desconto = (5 / 100)
            const subtrairNoValorFinal = valorTotalSemDescontos * desconto
            valorFinal = valorTotalSemDescontos - subtrairNoValorFinal
        } else {
            //não entra em nenhum ou seja método de pagamento invalido
            return "Forma de pagamento inválida!"
        }



        //verifica se tem o extra com o produto principal 
        if (temProduto) {
            if (temExtraComItemPrincipal && quantidadeValida) {
                return `R$ ${valorFinal.toFixed(2).replace('.', ',')}`
            } else if (!temExtraComItemPrincipal) {
                return "Item extra não pode ser pedido sem o principal"
            } else if (!quantidadeValida) {
                return "Quantidade inválida!"
            }
        } else {
            return "Item inválido!"
        }



    }

}


export { CaixaDaLanchonete };


