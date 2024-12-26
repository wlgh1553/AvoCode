#include<stdio.h>

void swap(int *a, int *b)
{
  int temp = *a;
  *a = *b;
  *b = temp;
}

void func1(int a, int b)
{
  printf("hello world1");
}

void func2()
{
  printf("hi world2");
}

void func3();

int main()
{
  int a = 10, b = 20;
  for(int i=0;i<3;i++) {
    swap(&a, &b);
    printf("a=%d, b=%d\n", a, b);
  }

  func1(a,b);
  func2();
  func3();
  
  return 0;
}

void func3()
{
  printf("helloworkd3");
}