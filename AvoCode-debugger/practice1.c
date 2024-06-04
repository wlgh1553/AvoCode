#include<stdio.h>

int global1 = 4;

typedef struct {
	int a;
	int b;
}MyStruct;

void swap(int* p, int* q)
{
	int temp = *p;
	*p = *q;
	*q = temp;
}

int main()
{
	MyStruct st;
	st.a = global1 - 1;
	st.b = global1 + 1;

	int arr[2] = { 5, 10 };
	swap(arr + 0, arr + 1);

	return 0;
}