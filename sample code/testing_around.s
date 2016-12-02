.data

    num1:   .word   5
    num2:   .word   3

    str1:   .asciiz "Quociente : "
    str2:   .asciiz "Resto : "

.text

    main:
    
        lw  r6, num1(r0)
        lw  r7, num2(r0)
        
        ddiv    r6,r7
        
        daddi r4, r0, str1
        jal print_string     ; mostra "Quociente : "
    
        mflo r4              ; r4 = low
        jal print_int
        
        daddi r4, r0, str2
        jal print_string
    
        mfhi r4              ; r4 = high
        jal print_int
    
    end:
        syscall 0
        
        #include print.s