---
title: Reducing Boilerplate Code with Project Lombok
date: 2021-04-14 
mathjax: true
tags: [Java, Programming]
---

Project Lombok aims to reduce the prevalence of some of the worst offenders by replacing them with a simple set of annotations


<!-- more -->


## Installation

`lombok.jar` will attempt to detect the location of a supported IDE automatically. The jar file will still need to be included in the classpath of any projects that will use Project Lombok annotations. Maven users can include Lombok as a dependency by adding this to the project `pom.xml` file

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>0.9.2</version>
    </dependency>
</dependencies>
<repositories>
    <repository>
        <id>projectlombok.org</id>
        <url>http://projectlombok.org/mavenrepo</url>
    </repository>
</repositories>
```



## Lombok Annotations



### @Getter and @Setter

the `@Getter` and `@Setter` annotations generate a getter and setter for a field, respectively

The getters generated correctly follow convention for boolean properties, resulting in an `isFoo` getter method name instead of `getFoo` for any boolean field `foo`. Note that if the class to which the annotated field belongs contains a method of the same name as the getter or setter to  be generated, regardless of parameter or return types, no corresponding method will be generated

Both the `@Getter` and `@Setter` annotations take an optional parameter to specify the access level for the generated method

```java
@Getter @Setter private boolean employed = true;
@Setter(AccessLevel.PROTECTED) private String name;
```





### @NonNull

The `@NonNull` annotation is used to indicate the need for a fast-fail null check on the corresponding member. When placed on a field for which Lombok is generatng a setter method, a null check will be generated that will result in a `NullPointerException`, should a null value be provided. If Lombok is generating a constructor for the owning class, then the field will be added to the constructor signature and the null check will be included in the generated constructor code. This annotation mirrors `@NotNull` and `@NonNull` annotations found in Intellij IDEA and FindBugs

```java
@Getter @Setter @NonNull
private List<Person> members;
```

Which equivalent to the following code:

```java
@NonNull
private List<Person> members;

public Family(@NonNull final List<Person> members) {
    if (members == null) throw new java.lang.NullPointerException("members");
    this.members = members;
}

@NonNull
public List<Person> getMembers() {
    return members;
}

public void setMembers(@NonNull final List<Person> members) {
    if (members == null) throw new java.lang.NullPointerException("members");
    this.members = members;
}
```



### @ToString

This annotation generates an implementation of the `toString` method. By default, any non-static fields will be included in the output of the method in name-value pairs. If desired, the inclusion of the property names in the output can be suppressed by setting the annotation parameter `includeFieldNames` to `false`

Specific fields can be excluded from the output of the generated method by including their field names in the `exclude` parameter. Alternatively, the `of` parameter can be used to list only those fields desired in the output

The output of the `toString` method of a superclass can also be included by setting the `callSuper` parameter to `true`

```java
@ToString(callSuper = true, exclude = "someExcludedField")
public class Foo extends Bar {
    private boolean someBoolean = true;
    private String someStringField;
    private float someExcludedField;
}
```



### @EqualsAndHashCode

This class level annotation will cause Lombok to generate both `equals` and `hashCode` methods. By default, any field in the class that is not static or transient will be considered by both methods. Much like `@ToString`, the `exclude` parameter is provided to prevent a field from being included in the generated logic. One can also use the `of` parameter to list only those fields that should be considered. Also like `@ToString`, there is a `callSuper` parameter for this annotation. Setting it to true will cause `equals` to verify equality by calling the `equals` from the superclass before considering fields in the current class

```java
@EqualsAndHashCode(callSuper = true, exclude = {"address", "city", "state", "zip"}) 
public class Person extends SentientBeing {
    enum Gender {Female, Male}
    
    @NonNull private String name;
    @NonNull private Gender gender;
    
    private String ssn;
    private String address;
    private String city;
    private String state;
    private String zip;
}
```



### @Data

The `@Data` annotation combines the functionality of `@ToString`, `@EqualsAndHashCode`, `@Getter` and `@setter`. Annotating a class with `@Data` also triggers Lombok's constructor generation. This adds a public constructor that takes any `@NonNull` or `final` fields as parameters. This provides everything needed for a Plain Old Java Object

`@Data` provides a single parameter option that can be used to generate a static factory method. Setting the value of the `staticConstructor` parameter to the desired method name will cause Lombok to make the generated constructor private and expose a static factory method of the given name

```java
@Data(staticConstructor="of")
public class Company {
    private final Person founder;
    private String name;
    private List<Person> employees;
}
```



### @Cleanup

The `@Cleanup` annotation can be used to ensure that allocated resources are released. When a local variable is annotated with `@Cleanup`, any subsequent code is wrapped in a `try/finally` block that guarantees that the cleanup method is called at the end of the current scope

By default `@Cleanup` assumes that the cleanup methods. In the event that an exception is thrown by the cleanup method, it will preempt any exception that was thrown in the method body. This can result in the actual cause of an issue being buried and should be considered when choosing to use Lombok's resource management

```java
public void testCleanUp() {
    try {
        @Cleanup ByteArrayOutpuStream baos = new ByteArrayOutputStream();
        baos.write(new byte[] {'Y', 'e', 's'});
        System.out.println(baos.toString());
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```



### @Synchronized

The synchronized keyword will lock on the current object (`this`) in the case of an instance method or on the `class` object for a static method. This means that there is the potential for code outside of the control of the developer to lock on the same object

It is generally advisable to instead lock explicitly on a separate object that is dedicated solely to that purpose and not exposed in such a way as to allow unsolicited locking. Project Lombok provides the `@Synchronized` annotation for that very purpose

Annotating an instance method with `@Synchronized` will prompt Lombok to generate a private locking field named `$lock` on which the method will lock prior to executing. Similarly, annotating a static method in the same way will generate a private static object named `$LOCK` for the static method to use in an identical fashion. A different locking object can be specified by providing a field name to the annotation's `value` parameter. When a field name is provided, the developer must define the property because Lombok will not generate it

```java
private DateFormat format = new SimpleDateFormat("MM-dd-YYYY");

@Synchronized
public String syncrhonizedFormat (Date date) {
    return format.format(date);
}
```

Equivalent Java source code:

```java
private final java.lang.Object $lock = new java.lang.Object[0];
private DateFormat format = new SimpleDateFormat("MM-dd-YYYY");

public String synchronizedFormat (Date date) {
    synchronized ($lock) {
        return format.format(date);
    }
}
```



### @SneakyThrows

By default, `@SneakyThrows` will allow any checked exception to be thrown without declaring in the `throws` clause. This can be limited to a particular set of exceptions by providing an array of throwable classes to the `value`  parameter of the annotation. The `sneakyThrow` method will never return normally and will instead throw the provided throwable completely unaltered

```java
@SneakyThrows
public void testSneakyThrows() {
    throw new IllegalAccessException();
}
```



## Costs and Benefits

There is the possibility that changes to the language will take place that preclude the use of Lombok's annotations, such as the addition of first class property support. Additionally, when used in combination with annotation-based object-relational mapping (ORM) frameworks, the number of annotations on data classes can begin to get unwieldy. This is largely offset by the amount of code that is superseded by the Lombok annotations



## Delombok

Project Lombok provides the `delombok` utility for replacing the Lombok annotations with equivalent source code. This can be done for an entire source directory via the command line

```shell
java -jar lombok.jar delombok src -d src-delomboked
```



## Limitations

One important problem is the inability to detect the constructors of a superclass. This means that if a superclass has no default constructor, any subclasses cannot use the @Data annotation without explicitly writing a constructor to make use of the available superclass constructor. Since Project Lombok respects any methods that match the name of a method to be generated, the majority of its feature shortcomings can be overcome using this approach

Another point of contention is the implementation of both the code supporting IDE integration as well as the `javac` annotation processor. Both of these pieces of project Lombok make use of non-public APIs to accomplish their sorcery. This means that there is a risk that Project Lombok will be broken with subsequent IDE or JDK releases



## References

1. [Lombok API Documentation](http://projectlombok.org/api/index.html)
2. [Project Lombok Issues List](http://code.google.com/p/projectlombok/issues/list)

