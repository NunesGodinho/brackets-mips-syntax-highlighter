#-------------------------------#-------------------------------------#
# MIPS sandbox
# Nathan Phipps
#-------------------------------#-------------------------------------#
.data

#strings
numbersString:	.asciiz		"Numbers: "
status1:		.asciiz		"Sum of the odds: "
status2:		.asciiz		"Sum of the evens: "
status3:		.asciiz		"\nSum of the odds - Sum of the evens = "
space:			.asciiz		" "
endl:			.asciiz		"\n"		# li $v0, 4

#ints
sumOdds:		.word		0
sumEvens:		.word		0
currentNum:		.word		1
maxNum:			.word		50
diff_of_sums:   .word       0

myByte:         .byte       4
myByte2:        .2byte      4
myByte4:        .4byte      4
myByte8:        .8byte      4

#-------------------------------#-------------------------------------#
.text

.globl main


#main proc

	main:
		lw $t7, maxNum			# $t0 = maxNum
		lw $t0, currentNum
		
		#===============================================
		#	SUM OF THE ODDS
		#===============================================

		# print numbersString
		la $a0, numbersString
		li $v0, 4
		syscall

		sum_loop:

			sgt $t6, $t0, $t7
			bne $t6, $zero, quit_sum_loop
			
			# print current number
			add $a0, $zero, $t0
			li $v0, 1
			syscall
			
			# print space
			la $a0, space
			li $v0, 4
			syscall
			
			add $t1, $t1 $t0
			addi $t0, $t0, 2
			j sum_loop
			
		quit_sum_loop:
		#print endline
		la $a0, endl
		syscall		
	
	#store $t1 into sum
	la $t2, sumOdds
	sw $t1, 0($t2)
    
    # print status1
    la $a0, status1
    li $v0, 4
    syscall
	
	#print sumOdds
	lw $a0, sumOdds
	li $v0, 1
	syscall
    
    #===============================================
    #	RESET VALUES
    #===============================================
    
    #reset currrentNum
    la $t2, currentNum
    li $t0, 1
    sw $t0, 0($t2)
    
    #reset registers
	li $t0, 0
    li $t1, 0
    li $t2, 0
    li $t3, 0
    li $t4, 0
    li $t5, 0
    li $t6, 0
    li $t7, 0
    
    #===============================================
    #	Compensate formatting
    #===============================================
    
    # print endl
    la $a0, endl
    li $v0, 4
	syscall
    
    #===============================================
    #	SUM OF THE EVENS
    #===============================================
    
    lw $t7, maxNum			# $t0 = maxNum
    lw $t0, currentNum
    addi $t0, $t0, 1
    
    # print numbersString
    la $a0, numbersString
    li $v0, 4
	syscall

		sum_loop_2:

			sgt $t6, $t0, $t7
			bne $t6, $zero, quit_sum_loop_2
			
			# print current number
			add $a0, $zero, $t0
			li $v0, 1
			syscall
			
			# print space
			la $a0, space
			li $v0, 4
			syscall
			
			add $t1, $t1 $t0
			addi $t0, $t0, 2
			j sum_loop_2
			
		quit_sum_loop_2:
		#print endline
		la $a0, endl
		syscall		
	
	#store $t1 into sum
	la $t2, sumEvens
	sw $t1, 0($t2)
	
    # print status2
    la $a0, status2
    li $v0, 4
    syscall
    
	#print sumEvens
	lw $a0, sumEvens
	li $v0, 1
	syscall
    
    #===============================================
    #	RESET VALUES
    #===============================================
    
    #reset currrentNum
    la $t2, currentNum
    li $t0, 1
    sw $t0, 0($t2)
    
    #reset registers
	li $t0, 0
    li $t1, 0
    li $t2, 0
    li $t3, 0
    li $t4, 0
    li $t5, 0
    li $t6, 0
    li $t7, 0
    
    #===============================================
    #	Compensate formatting
    #===============================================
    
    # print endl
    la $a0, endl
    li $v0, 4
	syscall
    
    #===============================================
    #	SUM OF THE ODDS - SUM OF THE EVENS
    #===============================================
    
    # print status3
    la $a0, status3
    li $v0, 4
	syscall
    
    lw $t1, sumOdds
    lw $t2, sumEvens
    sub $t7, $t1, $t2
    la $t0, diff_of_sums
    sw $t7, 0($t0)
    
    lw $a0, diff_of_sums
    li $v0, 1
    syscall
    
    
#end of main:

#-------------------------------#-------------------------------------#
#halting the program
	li $v0, 10		# set $v0 to 10, this tells syscall to end 
                    # execution of this program
	syscall
#-------------------------------#-------------------------------------#