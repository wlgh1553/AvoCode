#include<stdio.h>
#include<stdlib.h>

int global1 = 4;
int global2 = 3;
double global3 = 10.10;
int main()
{
  int a = global1;
  int* b = (int*) malloc(sizeof(int)*global1);
  int**c = (int**)malloc(sizeof(int*)*global1);
  int d[3] = {10,100,1000};
  for(int i=0;i<global1;i++) {
    c[i]=(int*)malloc(sizeof(int)*2);
  }
  for(int i=0;i<global1;i++) {
    b[i] = i+1;
    for(int j=0;j<2;j++) {
      c[i][j] = i+j;
    }
  }

  free(b);
  return 0; 
}